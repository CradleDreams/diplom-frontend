import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:3001/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default instance;
