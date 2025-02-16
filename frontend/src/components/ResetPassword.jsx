import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import api from "../api/api";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { openSuccess, openAlert } = useModal();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!newPassword) {
            return openAlert("Password cannot be empty");
        }
        if (newPassword.length < 6) {
            return openAlert("Password must be at least 6 characters long");
        }

        try {
            setLoading(true);
            const response = await api.post("/users/reset-password", { token, newPassword });
            openSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            openAlert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
                <p className="text-center text-gray-600 mb-8">Enter your new password</p>
                <div className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button
                    className={`w-full mt-6 py-2 font-semibold text-white rounded-xl ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"}`}
                    onClick={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
