import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  authCheck: async () => {
    try {
      const res = await axiosInstance.get("/user/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in CheckAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
  
    try {
      const res = await axiosInstance.post("/user/signup", data);
  
      if (res.status === 201) {
        set({ authUser: res.data });
        toast.success("Account Created Successfully!");
      }
    } catch (error) {
      set({ authUser: null });
  
      // Show error message from API response or default message
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  
}));
