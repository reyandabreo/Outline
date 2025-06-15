
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/*
import axios from "axios";
// in production there is no localhost so, we need to make it dynamic 
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api":"/api";

const api = axios.create({
    baseURL:BASE_URL,
});

export default api;
*/