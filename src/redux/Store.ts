import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../services/blogApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from './UserSlice'

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    User: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(blogApi.middleware),
});

setupListeners(store.dispatch)