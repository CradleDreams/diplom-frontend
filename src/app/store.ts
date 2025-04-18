import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { userReducer } from "../entities/user/model/userSlice";
import { videoReducer } from "../entities/video/model/videoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
