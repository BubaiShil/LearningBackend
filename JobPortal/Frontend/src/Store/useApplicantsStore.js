import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useApplicantsStore = create((set)=>({
    applicants: [],

    getApplicants: async (applicantId) => {
       try {
         const res = await axiosInstance.get(`/application/${applicantId}/applicants`)
         console.log(res.data);
         
         set({applicants : res.data.job})
       } catch (error) {
        console.error("getApplicants error:", error);
        toast.error(error.response?.data?.message || "getting Applicants failed");
       }
        
    },

    setStatus: async (statusId, status) => {
        try {
            const res = await axiosInstance.post(`/application/update-status/${statusId}`, { status });
            console.log(res.data);
    
            if (res?.data?.success) {
                toast.success(res.data.message);
                // if (jobId) {
                //     await getApplicants(jobId); // ✅ Refresh applicant list
                // }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }
    

}))