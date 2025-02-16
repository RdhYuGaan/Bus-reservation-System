import React, { useState, useEffect } from "react";
import api from "../../api/api";
import UpdateBusDriver from "./UpdateBusDriver"; // Modal for updating bus details

const BusList = ({ driverID, onClose }) => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBus, setSelectedBus] = useState(null); // For updating a bus

    // Fetch buses for the selected driver
    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const res = await api.get(`/buses/driver/${driverID._id}`);
                setBuses(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch buses");
            } finally {
                setLoading(false);

            }
        };

        if (driverID) {
            fetchBuses();
        }
    }, []);

    // Handle delete bus
    const handleDelete = async (busId) => {
        try {
            await api.delete(`/buses/${busId}`);
            setBuses((prev) => prev.filter((bus) => bus._id !== busId));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete bus");
        }
    };

    if (loading) return <p>Loading buses...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    ✕
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Buses for Driver
                </h3>
                <ul className="space-y-4">
                    {buses.map((bus) => (
                        <li key={bus._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <p>
                                <strong>Bus Number:</strong> {bus.number}
                            </p>
                            <p>
                                <strong>Route:</strong> {bus.route}
                            </p>
                            <p>
                                <strong>Seats:</strong> {bus.seats}
                            </p>
                            <p>
                                <strong>Departure Time:</strong> {bus.departureTime}
                            </p>
                            <p>
                                <strong>Arrival Time:</strong> {bus.arrivalTime}
                            </p>
                            <p>
                                <strong>Date:</strong> {new Date(bus.date).toLocaleDateString()}
                            </p>
                            <div className="mt-2 flex space-x-2">
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(bus._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>

                                {/* Update Button */}
                                <button
                                    onClick={() => setSelectedBus(bus)}
                                    className="bg-gray-900 text-white py-1 px-3 rounded hover:bg-gray-700"
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Update Bus Modal */}
                {selectedBus && (
                    <UpdateBusDriver
                        bus={selectedBus}
                        onClose={() => setSelectedBus(null)}
                        onUpdate={(updatedBus) =>
                            setBuses((prev) =>
                                prev.map((bus) => (bus._id === updatedBus._id ? updatedBus : bus))
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default BusList;
