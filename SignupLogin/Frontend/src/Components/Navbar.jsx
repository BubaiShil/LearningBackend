import React from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";

const Navbar = () => {

  const {authUser,checkAuth,ischeckingAuth} = useAuthStore()
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-semibold">MyChatt</div>

        {/* Logout Button */}
        {authUser && (
          <button className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
          <LogOut size={20} />
          Logout
        </button>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
