import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { create } from "zustand";


export const useCompanyStore = create((set) => ({


  singleCompany: null,
  companies : [],
 
  
  

  setSingleCompany: async (companyName,navigate) => {
    try {
      const res = await axiosInstance.post("/company/register", { name : companyName }); ///HERE "name" came from req.body in controller 
      // console.log("Full API response:", res.data); // Log entire response
      set({ singleCompany: res.data.createCompany });
      // console.log("Updated singleCompany:", res.data.createCompany);
      if (res?.data?.success) {
        const companyId = res?.data?.createCompany?._id
        // console.log(companyId);
        
        navigate(`/admin/companies-update/${companyId}`)
      }
      toast.success("Company name created")
    } catch (error) {
      console.error("setsinglecomp. error:", error);
      toast.error(error.response?.data?.message || "setsingleComp. failed");
    }
  },

  updateCompany: async (companyId, updatedData, navigate) => {

    console.log(companyId);
    console.log(updatedData);
    
    
    try {
      const res = await axiosInstance.put(`/company/update-company/${companyId}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ singleCompany: res.data.company });

      // if (res?.data?.success) {
      //   navigate(`/admin/companies`);
      // }

      toast.success("Company updated successfully!");
    } catch (error) {
      console.error("Error in updateCompany:", error);
      toast.error(error.response?.data?.message || "Company update failed");
    }
  },

  getCompanies: async () => {
    try {
      const res = await axiosInstance.get('/company/get')
      set({companies : res.data.company})
      // toast.success("Company name created")
    } catch (error) {
      console.error("getcompanies error:", error);
      toast.error(error.response?.data?.message || "getcompanies failed");
    }
  },

}));
