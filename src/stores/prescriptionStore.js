import { create } from "zustand";
import api from "../api/axios";

export const usePrescriptionStore = create((set) => ({
  prescriptions: [],
  singlePrescription: null,
  loading: false,
  error: null,

  getPrescriptions: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/prescriptions");

      set({
        prescriptions: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load prescriptions";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  getSinglePrescription: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/prescriptions/${id}`);

      set({
        singlePrescription: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load prescription";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  createPrescription: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/prescriptions", payload);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create prescription";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updatePrescription: async (id, payload) => {
    set({ loading: true, error: null });

    try {
      const res = await api.patch(`/prescriptions/${id}`, payload);

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update prescription";

      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  downloadPrescription: async (id) => {
    try {
      const res = await api.get(`/prescriptions/${id}/download`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `prescription-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to download prescription";
      throw new Error(message);
    }
  },
}));
