import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";
import axios from "../../../shared/api/axios";

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/create",
  async (
    userData: {
      username: string;
      email: string;
      password: string;
      genres: string[];
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/user/create_user", userData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("auth_token", token);
      }

      dispatch(setUser(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const getUser = createAsyncThunk(
  "user/get",
  async (
    credentials: { username: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/user/sign-in", credentials);

      const { accessToken, user } = response.data;

      console.log(accessToken);
      console.log(response);
      console.log(user);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      dispatch(setUser(user));

      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
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
