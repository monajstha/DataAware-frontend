import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000, // API hosted on free instance of render, which takes time to load, hence the unusual amount for timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send HttpOnly cookies automatically
});
