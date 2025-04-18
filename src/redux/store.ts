import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
