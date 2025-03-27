import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api";
import { STATUS } from "@/constants/constants";
import { DishItemsState } from "@/types/types";
export const fetchDishItems = createAsyncThunk(
  "/dishItems/get/fetchDishItems",
  async () => {
    try {
      const response = await axios.get("dishItems/get");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: DishItemsState = {
  dishItems: {
    data: null,
    status: STATUS.PENDING,
  },
};

const dishItemSlice = createSlice({
  name: "dishItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishItems.pending, (state) => {
        state.dishItems.data = [];
        state.dishItems.status = STATUS.PENDING;
      })
      .addCase(fetchDishItems.fulfilled, (state, action) => {
        state.dishItems.data = action.payload?.data;
        state.dishItems.status = STATUS.FULFILLED;
      })
      .addCase(fetchDishItems.rejected, (state) => {
        state.dishItems.data = [];
        state.dishItems.status = STATUS.REJECTED;
      })
  },
});


export const dishItemReducer = dishItemSlice.reducer;