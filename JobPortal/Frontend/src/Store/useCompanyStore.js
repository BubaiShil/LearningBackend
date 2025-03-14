import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { create } from "zustand";


export const useCompanyStore = create((set) => ({


  singleCompany: null,

  setSingleCompany: async (companyName,navigate) => {
    try {
      const res = await axiosInstance.post("/company/register", { name : companyName }); ///HERE "name" came from req.body in controller 
      set({ singleCompany: res.data.company });
      
      if (res?.data?.success) {
        const companyId = res?.data?.createCompany?._id
        console.log(companyId);
        
        navigate(`/admin/companies/${companyId}`)
      }
      toast.success("Company name created")
    } catch (error) {
      console.error("setsinglecomp. error:", error);
      toast.error(error.response?.data?.message || "setsingleComp. failed");
    }
  },
}));
