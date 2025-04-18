import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";

export interface IState {
  user: IUserData | undefined;
  file: IFileData | undefined;
}

interface IFileData {
  _id: string;
  title: string;
  duration: number;
  sourceUrl: string;
  filePath: FilePath;
  audioWavPath: FilePath;
  hlsPath: FilePath;
  status: string;
  subtitles?: Subtitles[];
}

interface Subtitles {
  language: string;
  default: boolean;
  filePath: FilePath;
}

interface FilePath {
  fileUrl: string;
  path: string;
  extension: string;
}

export interface IUserData {
  _id: string;
  createdAt: string;
  email: string;
  genres: string[];
  password: string;
  status: string;
  updatedAt: string;
  username: string;
}
interface IUserProps {
  username: string;
  email?: string;
  password: string;
  genres?: string[];
}

interface IFileProps {
  title?: string;
  duration?: number;
  size?: number;
  sourceUrl: string;
  userId: string;
}

export const createUser = createAsyncThunk(
  "create_user",
  async (userProps: IUserProps, { dispatch }) => {
    try {
      const { data } = await axios.post("/user/create_user", userProps);

      dispatch(setUser(data));

      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast("Ошибка");
      }
      throw err;
    }
  }
);

export const getUser = createAsyncThunk(
  "get_user",
  async (userProps: IUserProps, { dispatch }) => {
    try {
      const { data } = await axios.post("/user/sign-in", userProps);

      dispatch(setUser(data));

      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast("Ошибка");
      }
      throw err;
    }
  }
);

export const createFile = createAsyncThunk(
  "create_file",
  async (fileProps: IFileProps, { dispatch }) => {
    try {
      const { data } = await axios.post("/files/create", fileProps);

      dispatch(setFile(data));
      console.log(data);

      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast("Ошибка");
      }
      throw err;
    }
  }
);

const initialState: IState = {
  user: undefined,
  file: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.user = action.payload;
    },
    setFile: (state, action: PayloadAction<IFileData>) => {
      state.file = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

// Экспортируем редьюсер и action
export const { setUser, setFile } = userSlice.actions;
export const { removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
