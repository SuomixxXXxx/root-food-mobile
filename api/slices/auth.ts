import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STATUS } from "../../constants/constants";

interface AuthParams {
  login: string;
  password: string;
  name?: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (params: AuthParams) => {
    const response = await axios.post(
      `/auth/authenticate?login=${params.login}&password=${params.password}`
    );
    try {
      AsyncStorage.setItem("token", response.data.token);
      AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      console.log("token", AsyncStorage.getItem("token"));
      
    } catch (error) {
        console.log(error);
    }
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (params: AuthParams) => {
    const response = await axios.post("/auth/register", params);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk("auth/refresh", async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const response = await axios.post(
      `/auth/refresh?refreshToken=${refreshToken}`
    );
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403 || error.response?.status === 500) {
      await AsyncStorage.multiRemove(["token", "refreshToken"]);
    }
    throw error;
  }
});

interface AuthState {
  data: any;
  status: string;
}

const initialState: AuthState = {
  data: null,
  status: STATUS.PENDING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.multiRemove(["token", "refreshToken"]);
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: any) => Boolean(state.auth.data);
