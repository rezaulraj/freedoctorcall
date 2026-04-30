import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,

  isLoggedIn: () => !!get().token,

  login: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/auth/login", payload);

      const token = res.data.data.token;
      const user = res.data.data.user;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        loading: false,
      });

      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/auth/register", payload);
      set({ loading: false });
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      error: null,
    });

    window.location.href = "/";
  },
}));
