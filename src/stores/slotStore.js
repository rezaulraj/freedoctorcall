import { create } from "zustand";
import api from "../api/axios";

export const useSlotStore = create((set) => ({
  slots: [],
  singleSlot: null,
  loading: false,
  error: null,

  getSlots: async (query = {}) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/slots", {
        params: query,
      });

      set({
        slots: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load slots";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getSingleSlot: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/slots/${id}`);

      set({
        singleSlot: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load slot";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updateSlotStatus: async (id, status) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/slots/${id}/status`, { status });

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update slot status";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  blockSlot: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/slots/${id}/block`);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to block slot";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  unblockSlot: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/slots/${id}/unblock`);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to unblock slot";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
