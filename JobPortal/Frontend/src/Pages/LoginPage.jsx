import { useAuthStore } from "../Store/useAuthStore.js";
import {
  Eye,
  EyeOff,
  Mail,
  MessageSquare,
  User,
  Lock,
  Camera,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const {login} = useAuthStore()
  const [showpass, setShowpass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await login(formData);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                // required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showpass ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                // required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowpass(!showpass)}
              >
                {showpass ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Role & Resume Upload */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Role Selection */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={formData.role === "Student"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="radio radio-primary size-4"
                />
                <span className="text-sm">Student</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={formData.role === "Recruiter"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="radio radio-primary size-4"
                />
                <span className="text-sm">Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </form>

        {/* Don't have an account? */}
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
