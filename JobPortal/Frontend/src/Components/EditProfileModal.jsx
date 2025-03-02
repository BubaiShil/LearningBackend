import { useAuthStore } from "@/Store/useAuthStore";
import { X } from "lucide-react";
import { useState } from "react";

export const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { authUser ,updateProfile} = useAuthStore();

  const [input, setInput] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    bio: authUser?.profile?.bio || "",
    skills: authUser?.profile?.skills?.join(", ") || "",
    resume: authUser?.profile?.resume || "",
  });


  const handleUpdateProfile = async(e)=>{
    e.preventDefault()
    // const updatedData = {
    //     fullName: input.fullName,
    //     email: input.email,
    //     bio: input.bio,
    //     skill: input.skills, // Pass as a comma-separated string, backend will handle split
    //     resume: input.resume,
    //   };
    
    //   await updateProfile(updatedData);
    //   console.log("Updated data:", updatedData);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    
    if (input.resume instanceof File) {
      formData.append("file", input.resume);
    }

    await updateProfile(formData);
    console.log("Updated data:", formData);
    
  }

  return (
    <div className="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateProfile}>
          <div className="grid gap-4 py-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={input.fullName}
                onChange={(e)=>setInput({...input,fullName: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={input.email}
                onChange={(e)=>setInput({...input,email: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                placeholder="Write something about yourself..."
                value={input.bio}
                onChange={(e)=>setInput({...input,bio: e.target.value})}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div className="form-control">
              <label htmlFor="skills" className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                id="skills"
                type="text"
                placeholder="e.g. React, JavaScript, UI/UX"
                value={input.skills}
                onChange={(e)=>setInput({...input,skills: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label htmlFor="file" className="label">
                <span className="label-text">Resume</span>
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e)=>setInput({...input,resume: e.target.files?.[0]})}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
