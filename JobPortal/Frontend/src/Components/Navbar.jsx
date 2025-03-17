// import { useAuthStore } from "../Store/useAuthStore.js";
// import { Briefcase, Home, LogOut, User, Menu } from "lucide-react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const {authUser,logout} = useAuthStore(); // Change this to `true` to simulate logged-in state
//   //console.log("Profile Pic URL:", authUser?.profile?.profilePic);

//   const handleLogout=async()=>{
//     try {
//       await logout()
//     } catch (error) {
//       console.log("error in logout",error);
//       toast.error("Did'nt logout")
//     }
//   }

//   return (
//     <div className="navbar bg-base-100 shadow-md fixed w-full z-40">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <a className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer">
//           <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
//             <Briefcase className="w-5 h-5 text-primary" />
//           </div>
//           <h1 className="text-lg font-bold">
//             Job<span className="text-primary">Portal</span>
//           </h1>
//         </a>

//         {/* Navigation Links (Hidden on Mobile) */}
//         <div className="hidden md:flex gap-6">
//           <Link to='/'>
//           <button className="btn btn-ghost btn-sm flex items-center gap-1">
//             <Home size={18} /> Home
//           </button>
//           </Link>
//           <Link to='/jobs'>
//           <button className="btn btn-ghost btn-sm flex items-center gap-1">
//             <Briefcase size={18} /> Jobs
//           </button>
//           </Link>
//           <Link to='/browser'>
//           <button className="btn btn-ghost btn-sm flex items-center gap-1">
//             <Briefcase size={18} /> Browse
//           </button>
//           </Link>
//         </div>

//         {/* User Actions */}
//         <div className="flex items-center gap-3">
//           {authUser ? (
//             // If logged in: Show user dropdown
//             <div className="dropdown dropdown-end">
//               <button tabIndex={0} className="btn btn-ghost btn-sm flex gap-2 items-center">
//                 <div className="avatar">
//                   <div className="w-8 rounded-full">
//                   <img src={authUser?.profile?.profilePic || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="User Avatar" />

//                   </div>
//                 </div>
//                 <span className="hidden sm:inline">{authUser.fullName}</span>
//               </button>

//               {/* Dropdown Menu */}
//               <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-lg w-44 border">
//                 <li>
//                 <Link to='/profile'>
//                   <button className="flex items-center gap-2">
//                     <User size={18} /> Profile
//                   </button>
//                   </Link>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="flex items-center gap-2 text-error">
//                     <LogOut size={18} /> Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             // If not logged in: Show Login & Signup buttons
//             <div className="flex gap-3">
//               <Link to='/login'><button className="btn btn-outline btn-sm">Login</button></Link>
//               <Link to='/signup'><button className="btn btn-primary btn-sm">Signup</button></Link>
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button className="btn btn-ghost">
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useAuthStore } from "@/Store/useAuthStore";
import { Briefcase, Home, LogOut, User, Menu, Building } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const Navbar = () => {
  const { authUser, logout, isCheckingAuth } = useAuthStore();
  console.log("Navbar authUser:", authUser); // Debugging

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error in logout", error);
      toast.error("Didn't logout");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-16">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md fixed w-full z-40">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">
            Job<span className="text-primary">Portal</span>
          </h1>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          {/* Default links for all users */}

          { authUser && authUser?.role === "Recruiter" ? (
            <>
              <Link to="/admin/companies">
                <button className="btn btn-ghost btn-sm flex items-center gap-1">
                  <Building size={18} /> Companies
                </button>
              </Link>
              <Link to="/admin/jobs">
                <button className="btn btn-ghost btn-sm flex items-center gap-1">
                  <Briefcase size={18} /> Jobs
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <button className="btn btn-ghost btn-sm flex items-center gap-1">
                  <Home size={18} /> Home
                </button>
              </Link>
              <Link to="/jobs">
                <button className="btn btn-ghost btn-sm flex items-center gap-1">
                  <Briefcase size={18} /> Jobs
                </button>
              </Link>
              <Link to="/browser">
                <button className="btn btn-ghost btn-sm flex items-center gap-1">
                  <Briefcase size={18} /> Browse
                </button>
              </Link>
            </>
          )}

          {/* Additional link for Recruiters */}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {authUser ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm flex gap-2 items-center"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={`${
                        authUser?.profile?.profilePic ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }?${Date.now()}`} // Bypass cache
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <span className="hidden sm:inline">{authUser.fullName}</span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-lg w-44 border"
              >
                {/* Show Profile button only for Students */}
                { authUser.role === "Student" && (
                  <li>
                    <Link to="/profile">
                      <button className="flex items-center gap-2">
                        <User size={18} /> Profile
                      </button>
                    </Link>
                  </li>
                )}
                
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-error"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="btn btn-outline btn-sm">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary btn-sm">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
