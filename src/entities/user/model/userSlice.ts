import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";
import axios from "../../../shared/api/axios";

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    _id: "dsds",
    username: "kaka",
    email: "boba@dsdds.dsd",
    password: "dsdsd",
  },
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/create",
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/user/create_user", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "user/get",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/user/sign-in", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, removeUser, clearError } = userSlice.actions;
export const userReducer = userSlice.reducer;
