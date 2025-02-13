import {create} from 'zustand'
import {axiosInstancee} from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create((set)=>({
    isSignup : false,
    isLoginup: false,
    authUser : null,

    ischeckingAuth : true,
    

    checkAuth: async()=>{
        try {
            const res = await axiosInstancee.get("/auth/check")
            set({authUser : res.data})
            //get().connectSocket();
        } catch (error) {
            console.log("error in CheckAuth",error);
            set({authUser : null})
        }finally {
            set({ischeckingAuth : false})
        }
    },

    signup: async(data)=>{
        set({isSignup : true})
        try {
            const res = await axiosInstancee.post('/auth/signup',data)
            set({authUser : res.data})
            toast.success("Logged In Succcessfull")
        } catch (error) {
            console.log("error in signup",error);
            toast.error("Error in Signing Up")
        } finally{
            set({isSignup: false})
        }
    }
}))