import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer " + window.localStorage.getItem("accessToken");
  return config;
});

export default instance;
