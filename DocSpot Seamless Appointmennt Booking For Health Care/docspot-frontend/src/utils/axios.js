// src/utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ Update this to your production URL after deployment
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;