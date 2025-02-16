import React, { useState } from "react";
import api from "../../api/api";
import { useModal } from "../../context/ModalContext";

const UpdateBusDriver = ({ bus, onClose }) => {
    const [busDetails, setBusDetails] = useState({
        number: bus.number,
        route: bus.route,
        seats: bus.seats,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        date: bus.date,
    });
    const [image, setImage] = useState(null);
    const { openSuccess, openAlert } = useModal();

    const handleUpdateBus = async () => {
        // Ensure all required fields are filled
        if (
            !busDetails.number ||
            !busDetails.route ||
            !busDetails.seats ||
            !busDetails.departureTime ||
            !busDetails.arrivalTime ||
            !busDetails.date
        ) {
            openAlert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        Object.entries(busDetails).forEach(([key, value]) =>
            formData.append(key, value)
        );
        if (image) formData.append("image", image);

        try {
            await api.put(`/buses/${bus._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            openSuccess("Bus updated successfully!");
            onClose();
        } catch (err) {
            openAlert(err.response?.data?.message || "Failed to update bus");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    ✕
                </button>

                {/* Title */}
                <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
                    Update Bus Details
                </h3>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bus Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Bus Number
                        </label>
                        <input
                            type="text"
                            name="number"
                            placeholder="Enter Bus Number"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.number}
                            onChange={(e) =>
                                setBusDetails({ ...busDetails, number: e.target.value })
                            }
                        />
                    </div>

                    {/* Route */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Route
                        </label>
                        <select
                            name="route"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.route}
                            onChange={(e) =>
                                setBusDetails({ ...busDetails, route: e.target.value })
                            }
                        >
                            <option value="" disabled>
                                Select a Route
                            </option>
                            <option value="Matale to Colombo">Matale to Colombo</option>
                            <option value="Kandy to Mawanella">Kandy to Mawanella</option>
                            <option value="Kandy to Kegalle">Kandy to Kegalle</option>
                            <option value="Embilipitiya to Colombo">
                                Embilipitiya to Colombo
                            </option>
                            <option value="Monaragala to Colombo">
                                Monaragala to Colombo
                            </option>
                            <option value="Kurunegala to Kandy">Kurunegala to Kandy</option>
                        </select>
                    </div>

                    {/* Seats */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Number of Seats
                        </label>
                        <input
                            type="number"
                            name="seats"
                            placeholder="Enter Number of Seats"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.seats}
                            onChange={(e) =>
                                setBusDetails({ ...busDetails, seats: e.target.value })
                            }
                        />
                    </div>

                    {/* Departure Time */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Departure Time
                        </label>
                        <input
                            type="time"
                            name="departureTime"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.departureTime}
                            onChange={(e) =>
                                setBusDetails({
                                    ...busDetails,
                                    departureTime: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Arrival Time */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Arrival Time
                        </label>
                        <input
                            type="time"
                            name="arrivalTime"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.arrivalTime}
                            onChange={(e) =>
                                setBusDetails({ ...busDetails, arrivalTime: e.target.value })
                            }
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                            value={busDetails.date}
                            onChange={(e) =>
                                setBusDetails({ ...busDetails, date: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload New Bus Image (Optional)
                    </label>
                    <div className="relative border-dashed border-2 border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center">
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Bus Preview"
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                            ) : (
                                <p className="text-gray-500 text-sm">Click to upload image</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="mt-8 w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                    onClick={handleUpdateBus}
                >
                    Update Bus
                </button>
            </div>
        </div>
    );
};

export default UpdateBusDriver;
