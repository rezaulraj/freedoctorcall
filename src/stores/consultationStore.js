import { create } from "zustand";
import api from "../api/axios";

export const useConsultationStore = create((set) => ({
  room: null,
  loading: false,
  error: null,

  createRoom: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(
        `/consultations/appointments/${appointmentId}/room`,
      );
      set({ room: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create room";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getRoomByAppointment: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(
        `/consultations/appointments/${appointmentId}/room`,
      );
      set({ room: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load room";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getRoomByCode: async (roomCode) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/consultations/rooms/${roomCode}`);
      set({ room: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load room";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  closeRoom: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(
        `/consultations/appointments/${appointmentId}/room/close`,
      );
      set({ room: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to close room";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
