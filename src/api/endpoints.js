// Centralized API endpoint paths for authentication flows
// Base URL is handled by axiosClient (http://localhost:3000/api)

export const AUTH_ENDPOINTS = {
  register: "/auth/register",
  login: "/auth/login",
  me: "/auth/me",
  logout: "/auth/logout",
};

export default AUTH_ENDPOINTS;

