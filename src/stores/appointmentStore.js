import { create } from "zustand";
import api from "../api/axios";

export const useAppointmentStore = create((set) => ({
  appointments: [],
  singleAppointment: null,
  loading: false,
  error: null,

  getAppointments: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/appointments");

      set({
        appointments: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load appointments";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  bookAppointment: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/appointments", payload);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to book appointment";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updateAppointmentStatus: async (id, status) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/appointments/${id}/status`, { status });

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update appointment status";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  rescheduleAppointment: async (id, payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/appointments/${id}/reschedule`, payload);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reschedule appointment";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
