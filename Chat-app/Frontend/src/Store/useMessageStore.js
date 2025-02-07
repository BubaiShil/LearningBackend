import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) => ({
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoaing: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoaing: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoaing: false });
    }
  },

  sendMessage: async(messageData)=>{
    const {messages,selectedUser} = get()
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
      set({messages : [...messages,res.data]})
    } catch (error) {
      toast.error(error.response.data.message);
    }

  },

  setSelectedUser: (selectedUser)=>{
    set({selectedUser})
  }


}));
