import {create} from 'zustand'
import {axiosInstancee} from '../lib/axios.js'

export const useAuthStore = create((set)=>({
    isSignup : false,
    isLoginup: false,
    authUser : null,

    ischeckingAuth : true,
    

    checkAuth: async()=>{
        try {
            const res = await axiosInstancee.post("/auth/check")
            set({authUser : res.data})
            //get().connectSocket();
        } catch (error) {
            console.log("error in CheckAutg",error);
            set({authUser : null})
        }finally {
            set({ischeckingAuth : false})
        }
    }
}))