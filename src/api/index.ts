import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Free instance of render takes time to load, hence the unusual amount
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send HttpOnly cookies automatically
});
