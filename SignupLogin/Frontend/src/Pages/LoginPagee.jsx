import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";

const LoginPagee = () => {
  const { isLoginup, login } = useAuthStore();

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full ml-2 p-2 outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="w-full ml-2 p-2 outline-none"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <Eye className="text-gray-500" size={20} />
              ) : (
                <EyeOff className="text-gray-500" size={20} />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Link to signup */}
        <div className="text-center mt-4 text-gray-700">
          <p className="inline-flex items-center gap-1">
            Create an account?
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPagee;
