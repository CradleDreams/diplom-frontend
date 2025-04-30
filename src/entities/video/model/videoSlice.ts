import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideoFile } from "./types";
import axios from "../../../shared/api/axios";

interface VideoState {
  file: IVideoFile | null;
}

const initialState: VideoState = {
  file: null,
};

export const createFile = createAsyncThunk(
  "video/create",
  async (
    fileData: { sourceUrl: string; userId: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      console.log(fileData);
      const response = await axios.post("/files/create", fileData);

      dispatch(setFile(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create file",
      );
    }
  },
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<IVideoFile>) => {
      state.file = action.payload;
    },
    clearFile: (state) => {
      state.file = null;
    },
  },
});

export const { setFile, clearFile } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
