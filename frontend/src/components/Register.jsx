import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import api from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("passenger");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { openSuccess, openAlert } = useModal();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!role) newErrors.role = "Please select a role.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await api.post("/users/register", { name, email, password, role });
      openSuccess("Register successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      openAlert(err.response?.data?.message || "Register failed! Try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 ">
          <img
            className="w-auto h-full"
            src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
            alt="Background Pattern"
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative z-20">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
            Create Your Account
          </h1>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full border p-2 rounded-md ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"
                  } focus:ring-2 focus:border-gray-500 outline-none`}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border p-2 rounded-md ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"
                  } focus:ring-2 focus:border-gray-500 outline-none`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className={`w-full border p-2 rounded-md ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"
                  } focus:ring-2 focus:border-gray-500 outline-none`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className={`w-full border p-2 rounded-md ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"
                  } focus:ring-2 focus:border-gray-500 outline-none`}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>


          </div>

          <button
            className="mt-6 w-full px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-700"
            onClick={handleRegister}
          >
            Register
          </button>

          <p className="mt-4 text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <a href="/login" className="font-semibold">
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
