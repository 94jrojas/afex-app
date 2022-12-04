import { configureStore } from "@reduxjs/toolkit";
import appbarReducer from "./slices/appbar";

export const store = configureStore({
  reducer: {
    appbar: appbarReducer,
  },
});