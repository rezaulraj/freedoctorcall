import { create } from "zustand";
import api from "../api/axios";

export const useNotificationStore = create((set) => ({
  notifications: [],
  loading: false,
  error: null,

  getNotifications: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/notifications");

      set({
        notifications: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load notifications";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  createNotification: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/notifications", payload);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create notification";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  markAsSent: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/notifications/${id}/sent`);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to mark notification as sent";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  markAsFailed: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/notifications/${id}/failed`);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to mark notification as failed";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
