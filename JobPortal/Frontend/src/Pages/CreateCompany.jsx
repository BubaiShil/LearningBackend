import { useCompanyStore } from "@/Store/useCompanyStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
    const {setSingleCompany} = useCompanyStore()
    const [input, setInput] = useState("")
  const navigate = useNavigate();

  const registerCompany=async()=>{
    try {
        await setSingleCompany(input,navigate)
        setInput("")
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <div className="max-w-4xl mx-auto pt-24">
      <div className="mb-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to give your company name? You can change this
          later.
        </p>
      </div>

      <label className="label">
        <span className="label-text font-medium">Company Name</span>
      </label>
      <input
        type="text"
        className="input input-bordered w-full my-2"
        placeholder="JobHunt, Microsoft etc."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />

      <div className="flex items-center gap-2 my-10">
        <button
          onClick={() => navigate("/admin/companies")}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button onClick={registerCompany} className="btn btn-primary">Continue</button>
      </div>
    </div>
  );
};

export default CreateCompany;
