import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dishItemReducer } from "./slices/dishItem";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["dishItems"],
};

const rootReducer = combineReducers({
  dishItems: dishItemReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
