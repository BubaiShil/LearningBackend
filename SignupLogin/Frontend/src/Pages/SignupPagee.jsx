import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import {toast} from "react-hot-toast"

const SignupPagee = () => {

  const {signup} = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    fullName : "",
    email: "",
    password : ""
  })
  

  const validate = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");


    return true;
  };
  
  


  const handleSubmit=(e)=>{
    e.preventDefault()

    const validatedRes = validate()

    if (validatedRes===true) {
      signup(formData)
    }
    
    
  }




  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e)=>setFormData({...formData,fullName : e.target.value})}
              className="w-full ml-2 outline-none bg-transparent p-1"
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Mail className="text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email: e.target.value})}
              className="w-full ml-2 outline-none bg-transparent p-1"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Lock className="text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password: e.target.value})}
              className="w-full ml-2 outline-none bg-transparent p-1"
            />
            <button type="button" onClick={()=>setShowPassword(!showPassword)}>
              {!showPassword ? (
                <EyeOff className="text-gray-500" size={20} />) : (<Eye className="text-gray-500" size={20} />)
              }
            
            </button>
           
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPagee;
