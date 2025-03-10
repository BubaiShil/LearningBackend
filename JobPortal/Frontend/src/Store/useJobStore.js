import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";


export const useJobStore = create((set)=>({
    jobs: [],
    setONEjob: null,
    fetchingALLJobs: false,
    fetchingONEJob: false,
    settingJobs : false,

    getAllJobs : async()=>{
        set({fetchingJobs : true})

        try {
            const res = await axiosInstance.get('/job/get')
            set({ jobs: res.data.jobs });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ fetchingJobs: false });
        }
    },

    getSingleJob : async(id)=>{
        set({fetchingONEJob : true})

        try {
            const res = await axiosInstance.get(`/job/get/${id}`)
            set({ setONEjob: res.data.job });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ fetchingONEJob: false });
        }
    },

    applyJob : async(jobid,authUserId)=>{
        //set({fetchingONEJob : true})

        try {
            const res = await axiosInstance.get(`/application/apply/${jobid}`)
            console.log(res);
            
            toast.success(res.data.message);

            set((state) => ({
                setONEjob: {
                    ...state.setONEjob,
                    applications: [
                        ...(state.setONEjob?.applications || []),
                        { applicant: authUserId }
                    ],
                },
            }));
            
        } catch (error) {
            console.log("error in jobstore",error);
            toast.error(error.response.data.message);
        } 
    },


}))


