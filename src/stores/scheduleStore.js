import { create } from "zustand";
import api from "../api/axios";

export const useScheduleStore = create((set) => ({
  schedules: [],
  loading: false,
  error: null,

  getSchedules: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/schedules");
      set({ schedules: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load schedules";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  createSchedule: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/schedules", payload);
      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create schedule";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updateSchedule: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/schedules/${id}`, payload);
      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update schedule";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  deleteSchedule: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/schedules/${id}`);
      set({ loading: false });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete schedule";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  generateSlots: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/schedules/generate-slots", payload);
      set({ loading: false });
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to generate slots";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
