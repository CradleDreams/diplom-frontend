import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideoFile } from "./types";
import axios from "../../../shared/api/axios";

interface VideoState {
  file: IVideoFile | null;
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  file: {
    _id: "fdfdfdf",
    title: "dfdfdfd",
    description: "dfdfdfd",
    duration: 1221,
    sourceUrl: "dfdfdf",
    status: "ready",
  },
  loading: false,
  error: null,
};

export const createFile = createAsyncThunk(
  "video/create",
  async (
    fileData: { sourceUrl: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/files/create", fileData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create file"
      );
    }
  }
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
  extraReducers: (builder) => {
    builder
      .addCase(createFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload;
      })
      .addCase(createFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFile, clearFile } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
