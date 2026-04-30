import { create } from "zustand";
import api from "../api/axios";

export const useDoctorStore = create((set) => ({
  myProfile: null,
  doctors: [],
  loading: false,
  error: null,

  getMyDoctorProfile: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/doctors/me");

      set({
        myProfile: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load doctor profile";

      set({
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  updateMyDoctorProfile: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch("/doctors/me", payload);

      set({
        myProfile: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update doctor profile";

      set({
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  getAllDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/doctors");
      set({ doctors: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to load doctors";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  adminUpdateDoctor: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/doctors/${id}`, payload);
      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update doctor";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
