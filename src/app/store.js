import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { baseApi } from "./baseApi";
import messageSlice from "./messageSlice";

export const store = configureStore({
  reducer: {
    message: messageSlice,
    authSlice: authSlice, 
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});
