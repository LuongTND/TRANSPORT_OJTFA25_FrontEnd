import axiosClient from "./axiosClient";
import { AUTH_ENDPOINTS } from "./endpoints";

// Enable mock by default for demo; set VITE_USE_AUTH_MOCK='false' to disable
const USE_AUTH_MOCK = !((import.meta && import.meta.env && import.meta.env.VITE_USE_AUTH_MOCK) === 'false');

export const authService = {
  register: (payload) => {
    if (USE_AUTH_MOCK) {
      const user = {
        id: Date.now(),
        fullname: payload.fullname || 'User Demo',
        email: payload.email,
        phone: payload.phone,
        role: payload.role || 'customer',
      };
      return Promise.resolve({
        data: { token: `mock-token-${Date.now()}`, refreshToken: `mock-refresh-${Date.now()}`, user },
      });
    }
    return axiosClient.post(AUTH_ENDPOINTS.register, payload);
  },
  login: (payload) => {
    if (USE_AUTH_MOCK) {
      const user = {
        id: 1,
        fullname: payload.role === 'admin' ? 'Admin Demo' : payload.role === 'driver' ? 'Driver Demo' : 'Customer Demo',
        email: payload.email,
        role: payload.role || 'customer',
      };
      return Promise.resolve({
        data: { token: `mock-token-${Date.now()}`, refreshToken: `mock-refresh-${Date.now()}`, user },
      });
    }
    return axiosClient.post(AUTH_ENDPOINTS.login, payload);
  },
  me: () => axiosClient.get(AUTH_ENDPOINTS.me),
  logout: () => axiosClient.post(AUTH_ENDPOINTS.logout),
};

export default authService;

