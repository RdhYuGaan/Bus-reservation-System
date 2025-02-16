import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useLoader } from "../../context/LoaderContext";

const AssignBusDriver = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("driver");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { openSuccess, openAlert } = useModal();
    const { startLoading, stopLoading } = useLoader();

    // Function to generate a random password
    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        return password;
    };

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required.";
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!role) newErrors.role = "Please select a role.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        const randomPassword = generatePassword();

        try {
            // Send user data along with the generated password to the backend
            startLoading();
            setLoading(true);
            const res = await api.post("/users/register", {
                name,
                email,
                password: randomPassword,
                role,
            });

            // Send an email with the generated password
            await api.post("/users/send-password-email", {
                email,
                password: randomPassword,
            });

            openSuccess("Driver registered successfully! Email sent with login credentials.");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            openAlert(err.response?.data?.message || "Register failed! Try again.");
        }
        finally {
            stopLoading();
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    ✕
                </button>
                <div className="flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md relative z-20">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
                            Create Driver Account
                        </h1>
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
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
                                    placeholder="Enter email"
                                    className={`w-full border p-2 rounded-md ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"
                                        } focus:ring-2 focus:border-gray-500 outline-none`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <button
                            className={`w-full mt-6 py-2 font-semibold  text-white bg-gray-900 rounded-xl hover:bg-gray-700  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
                                }`}

                            disabled={loading}
                            onClick={handleRegister}
                        >
                            {loading ? "Adding..." : "Add driver"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignBusDriver;
