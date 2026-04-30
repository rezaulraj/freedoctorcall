import { create } from "zustand";
import api from "../api/axios";

export const usePatientStore = create((set) => ({
  myProfile: null,
  patients: [],
  loading: false,
  error: null,

  getMyPatientProfile: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/patients/me");

      set({
        myProfile: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load patient profile";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updateMyPatientProfile: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch("/patients/me", payload);

      set({
        myProfile: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update patient profile";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getAllPatients: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/patients");
      set({ patients: res.data.data, loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load patients";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
  
  adminUpdatePatient: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/patients/${id}`, payload);
      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update patient";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));
