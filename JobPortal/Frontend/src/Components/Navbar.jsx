import { Briefcase, Home, LogOut, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = false; // Change this to `true` to simulate logged-in state

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

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6">
          <button className="btn btn-ghost btn-sm flex items-center gap-1">
            <Home size={18} /> Home
          </button>
          <button className="btn btn-ghost btn-sm flex items-center gap-1">
            <Briefcase size={18} /> Jobs
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            // If logged in: Show user dropdown
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm flex gap-2 items-center">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://via.placeholder.com/40" alt="User Avatar" />
                  </div>
                </div>
                <span className="hidden sm:inline">John Doe</span>
              </button>

              {/* Dropdown Menu */}
              <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-lg w-44 border">
                <li>
                  <button className="flex items-center gap-2">
                    <User size={18} /> Profile
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-2 text-error">
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // If not logged in: Show Login & Signup buttons
            <div className="flex gap-3">
              <Link to='/login'><button className="btn btn-outline btn-sm">Login</button></Link>
              <Link to='/signup'><button className="btn btn-primary btn-sm">Signup</button></Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="btn btn-ghost">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
