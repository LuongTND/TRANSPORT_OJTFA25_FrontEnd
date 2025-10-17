import axios from "axios";

const DEFAULT_TIMEOUT_MS = 15000;

// Use Vite env variable if provided, fallback to local API
const apiBaseUrl = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:3000/api";

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Trả thẳng data để dùng ngắn gọn hơn
    return response.data;
  },
  (error) => {
    const statusCode = error?.response?.status;
    console.error("API Error:", error.response || error.message);

    if (statusCode === 401) {
      // TODO: xử lý logout/refresh token nếu cần
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
