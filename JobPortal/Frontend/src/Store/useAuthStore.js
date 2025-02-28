import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogining: false,
  isUpdateProfile: false,


  // authCheck: async () => {
  //   try {
  //     const res = await axiosInstance.get("/user/check");
  //     set({ authUser: res.data });
  //   } catch (error) {
  //     console.log("error in CheckAuth", error);
  //     set({ authUser: null });
  //   } finally {
  //     set({ isCheckingAuth: false });
  //   }
  // },
  authCheck: async () => {
    console.log("Running authCheck...");
    try {
      const res = await axiosInstance.get("/user/check", { withCredentials: true });
      set({ authUser: res.data });
      //console.log("Auth check response:", res.data);
    } catch (error) {
      //console.log("error in CheckAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  

  signup: async (data) => {
    console.log("Running signup...");
    set({ isSigningUp: true });
  
    try {
      const res = await axiosInstance.post("/user/signup", data);
  
      if (res.status === 201) {
        set({ authUser: res.data });
        toast.success("Account Created Successfully!");
      }
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    console.log("Running login...");
    set({ isLogining: true });
  
    try {
      const res = await axiosInstance.post("/user/login", data);
  
      
        set({ authUser: res.data });
        toast.success("Account LoggedIn Successfully!");
     
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLogining: false });
    }
  },

  updateProfile: async (data) => {
    if (!data) {
      toast.error("Invalid data provided");
      return;
    }
  
    console.log("Running update...");
    set({ isUpdateProfile: true });
  
    try {
      const res = await axiosInstance.put("/user/update-profile", data);
      
      if (res.data && res.data.success) {
        set({ authUser: res.data.user });  // ✅ Ensure updated user data is stored
        toast.success("Profile Updated Successfully!");
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdateProfile: false });
    }
  },
  

  
}));
