import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api";
import { STATUS } from "@/constants/constants";
import { CategoriesState } from "@/types/types";

export const fetchCategories = createAsyncThunk(
  "/categories/get/fetchCategories",
  async () => {
    const response = await axios.get("categories/get?active=false");
    // console.log(response)
    return response;
  }
);

const initialState: CategoriesState = {
  categories: {
    data: null,
    status: STATUS.PENDING,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.data = [];
        state.categories.status = STATUS.PENDING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.data = action.payload?.data;
        state.categories.status = STATUS.FULFILLED;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.data = [];
        state.categories.status = STATUS.REJECTED;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
