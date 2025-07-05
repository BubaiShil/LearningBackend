import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
// import { useCompanyStore } from "./useCompanyStore.js";
// import { useCompanyStore } from "./useCompanyStore";

// const {setSettingQuery} = useCompanyStore()

export const useJobStore = create((set,get)=>({
    jobs: [],
    setONEjob: null,
    fetchingALLJobs: false,
    fetchingONEJob: false,
    settingJobs : false,
    adminJobs : [],
    settingQuery: "",  // ✅ Add this to state
    setSettingQuery: (query) => set({ settingQuery: query }),

    getAllJobs: async () => {
        const { settingQuery } = get();
      
        set({ fetchingJobs: true });
      
        try {
          let url = "/job/get";  // Default URL to fetch all jobs
      
          if (settingQuery) {
            url += `?keyword=${settingQuery}`; // Append query if it exists
          }
      
          const res = await axiosInstance.get(url);
          console.log("API Response:", res.data);  // Debugging log
      
          set({ jobs: res.data.jobs });
        } catch (error) {
          console.error("Error fetching jobs:", error);
          toast.error(error.response?.data?.message || "Something went wrong");
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


    getAdminJob: async () => {
        try {
            const res = await axiosInstance.get('/job/adminJobs')
            set({adminJobs : res.data.jobsbyAdmin})
        } catch (error) {
            console.log("error in adminJobs",error);
            toast.error(error.response.data.message);
        }
    },

    jobPost: async (data) => {
        try {
            const res = await axiosInstance.post('/job/post',data)
            set({adminJobs : res.data.jobCreate})
            if (res?.data?.success) {
                toast.success('Job Posted Succesfully')
            }
        } catch (error) {
            console.log("error in postJobs",error);
            toast.error(error.response.data.message);
        }
    }


}))


