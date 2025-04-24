import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api";
import { STATUS } from "@/constants/constants";
import {
  AddToCartPayload,
  CartState,
  RemoveFromCartPayload,
} from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const orderCreate = createAsyncThunk(
  'cart/orderCreate',
  async (params: { orderContentDTOs: Array<{ dishItemDTO: { id: number }; quantity: number }> }, thunkAPI) => {
    try {
      const response = await axios.post('/order/create', {
        orderContentDTOs: params.orderContentDTOs
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);

const initialState: CartState = {
  items: [],
  amount: 0,
  totalPrice: 0,
  status: STATUS.PENDING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      const availableQuantity = action.payload.totalQuantity;

      if (existingItem) {
        if (existingItem.quantity < existingItem.totalQuantity) {
          existingItem.quantity += 1;
          existingItem.price = existingItem.unitPrice * existingItem.quantity;
          state.amount += 1;
          state.totalPrice += existingItem.unitPrice;
        }
      } else {
        state.items.push({
          ...action.payload,
          unitPrice: action.payload.price,
          price: action.payload.price * 1,
          quantity: 1,
          totalQuantity: availableQuantity,
        });
        state.amount += 1;
        state.totalPrice += action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.price -= existingItem.unitPrice;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      state.amount -= 1;
      state.totalPrice -= existingItem.unitPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(orderCreate.fulfilled, (state) => {
        state.status = STATUS.FULFILLED;
        state.items = [];
        state.amount = 0;
        state.totalPrice = 0;
      })
      .addCase(orderCreate.rejected, (state) => {
        state.status = STATUS.REJECTED;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
