import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'


export const useAuthStore = create((set,get)=>({
    authUser : null,
    isSignedUp : false,
    isLoggedIn: false,
    isUpdateProfile : false,
    onlineUsers: [],
    isCheckingAuth : true,
    socket : null,

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser : res.data})
            get().connectSocket();
        } catch (error) {
            console.log("error in CheckAutg",error);
            set({authUser : null})
        }finally {
            set({isCheckingAuth : false})
        }
    },

    signUp : async(data)=>{
        set({isSignedUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser : res.data})  //data came from backend aftere axios instance post connection to backend
            toast.success("Account Created Sucessfully")
            get().connectSocket();
        } catch (error) {
            set({ authUser : null})
            toast.error(error.response.data.message)
        }finally{
            set({ isSignedUp : false})
        }
    },

    login: async (data) => {
        set({ isLoggedIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggedIn: false });
        }
      },

    logout : async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
          } catch (error) {
            toast.error(error.response.data.message);
          }
    },

    updateProfile : async(data)=>{
      set({ isUpdateProfile : true})
        try {
          const res = await axiosInstance.put("/auth/update-profile",data)
          set({ authUser : res.data})
          toast.success("Profile Picture Updated Successfully !")
        } catch (error) {
          console.log("error in update profile",error);
          toast.error("Internal Server Error")
        } finally {
          set({isUpdateProfile : false})
        }
    },

    connectSocket: ()=>{},
    disconnectSocket: ()=>{}
}))