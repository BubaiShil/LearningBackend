import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCompanyStore } from "@/Store/useCompanyStore";

const CompanyEdit = () => {
    const navigate = useNavigate();
    const params = useParams()
    const {singleCompany,setSingleCompany,updateCompany} = useCompanyStore()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    // console.log(singleCompany);
    
    // useEffect(() => {
    //   setFormData({
    //     name: singleCompany?.name ||"",
    //     description: "",
    //     website: "",
    //     location: "",
    //     file: null
    //   })
    // }, [singleCompany])
    console.log("Company ID:", params.id);



    const submitHandler = async (e) => {
      e.preventDefault();
  
      const updatedFormData = new FormData();
      updatedFormData.append("name", formData.name);
      updatedFormData.append("description", formData.description);
      updatedFormData.append("website", formData.website);
      updatedFormData.append("location", formData.location);
      
      if (formData.file) {
          updatedFormData.append("file", formData.file);
      }
  
      try {
          await updateCompany(params.id,updatedFormData,navigate)
          // if (response.ok) {
              // alert("Company updated successfully!");
              navigate("/admin/companies"); // Redirect after success
          // } else {
          //     console.error("Update failed");
          // }
      } catch (error) {
          console.error("Error submitting form:", error);
      }
  };
  
    

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-600 to-purple-700 px-4">
            {/* Navbar */}
            <div className="navbar w-full max-w-5xl pt-20 flex justify-start">
                <button
                    onClick={() => navigate("/admin/companies")}
                    className="flex items-center gap-2 text-white hover:text-gray-200 transition-all"
                >
                    <ArrowLeft size={20} />
                    <span className="font-semibold">Back</span>
                </button>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg p-8 mt-10 shadow-2xl rounded-2xl border border-white/20">
                <h1 className="text-4xl font-bold text-center text-white mb-6">Edit Company</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Grid Layout for Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-semibold text-white">Company Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Enter company name..."
                            />
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Website</label>
                            <input 
                                type="text" 
                                name="website" 
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Enter website URL..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="label font-semibold text-white">Description</label>
                            <textarea 
                                name="description" 
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="textarea textarea-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Write a short company description..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Location</label>
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 transition-all"
                                placeholder="Company location..."
                            />
                        </div>
                        <div>
                            <label className="label font-semibold text-white">Upload Logo</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                                className="file-input file-input-bordered w-full bg-white/20 text-white focus:bg-white/30 transition-all"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold transition-all">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyEdit;
