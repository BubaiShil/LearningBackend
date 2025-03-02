import { EditProfileModal } from "@/Components/EditProfileModal";
import { useAuthStore } from "@/Store/useAuthStore";
import { Camera, Mail, User, Pen, Phone } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const { authUser } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Resume URL:", authUser?.profile?.resume);

  return (
    <div className="h-full min-h-screen pt-16 bg-gray-50 flex justify-center">
      <div className="max-w-4xl w-full p-6">
        {/* Profile Header Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6">
          <div className="relative">
            <img
              src={authUser?.profile?.profilePic||"https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-gray-300"
            />
            <label className="absolute bottom-1 right-1 bg-gray-700 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200">
              <Camera className="w-5 h-5 text-white" />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{authUser?.fullName}</h1>
            <p className="text-gray-500 text-sm">
            {authUser?.profile?.bio}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Pen className="w-4 h-4" />
            Edit
          </button>
        </div>

        {/* Profile Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-600" />
                <span className="text-gray-800">{authUser?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-600" />
                <span className="text-gray-800">+123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {authUser?.profile?.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    skill === "React"
                      ? "bg-blue-100 text-blue-600"
                      : skill === "JavaScript"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white shadow-md rounded-xl p-6 col-span-full">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Resume</h2>
            <a
              target="_blank"
              href={authUser?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              resume.pdf
            </a>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white shadow-md rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Applied Jobs
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Job Role</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">2024-02-15</td>
                <td className="p-3">Frontend Developer</td>
                <td className="p-3">TechCorp</td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 bg-green-400 text-white rounded-md text-sm">
                    ACCEPTED
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">2024-02-10</td>
                <td className="p-3">Backend Developer</td>
                <td className="p-3">CodeWave</td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 bg-gray-400 text-white rounded-md text-sm">
                    PENDING
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">2024-01-25</td>
                <td className="p-3">UI/UX Designer</td>
                <td className="p-3">DesignHub</td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 bg-red-400 text-white rounded-md text-sm">
                    REJECTED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Profile;
