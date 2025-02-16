import React, { useState } from "react";
import axios from "axios";
import { useModal } from "../context/ModalContext";
import api from "../api/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { openSuccess, openAlert } = useModal();
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            return openAlert("Please enter your email");
        }

        try {
            setLoading(true);
            const response = await api.post("/users/forgot-password", { email });
            openSuccess(response.data.message);
        } catch (error) {
            openAlert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h1>
                <p className="text-center text-gray-600 mb-8">Enter your email to receive the reset password link</p>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className={`w-full mt-6 py-2 font-semibold text-white rounded-xl ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"}`}
                    onClick={handleForgotPassword}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
