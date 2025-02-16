import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

export default function Reservations() {
  const [buses, setBuses] = useState([]); // List of buses for the driver
  const [selectedBus, setSelectedBus] = useState(null); // Selected bus details
  const [busDetails, setBusDetails] = useState(null); // Bus reservation details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const { user } = useAuth(); // Get user context

  // Fetch driver's buses on component mount
  useEffect(() => {
    const fetchDriverBuses = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/buses/driver/${user.id}`);
        setBuses(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverBuses();
  }, [user.id]);

  // Fetch details of the selected bus
  const fetchBusDetails = async (busId) => {
    setLoading(true);
    try {
      const res = await api.get(`reservations/bus-details/${busId}`);
      setBusDetails(res.data);
      setSelectedBus(busId);
    } catch (err) {
      console.error("Error fetching bus details:", err);
      alert("Failed to fetch bus details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Driver's Buses & Reservations
      </h1>

      {/* Display Error Message */}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* List of Buses */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {buses.map((bus) => (
          <div
            key={bus._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer relative"
            onClick={() => fetchBusDetails(bus._id)}
          >
            <img
              src={bus.image || "/default-bus.png"} // Default image if none provided
              alt="Bus"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs">
              {new Date(bus.date).toLocaleDateString()}
            </div>
            <h2 className="text-lg font-bold">{bus.number}</h2>
            <p className="text-sm text-gray-600">Route: {bus.route}</p>
            <p className="text-sm text-gray-600">
              Departure: {bus.departureTime}
            </p>
            <p className="text-sm text-gray-600">
              Arrival: {bus.arrivalTime}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Bus Details */}
      {selectedBus && busDetails && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md w-[220px] md:w-full">
          <h2 className="text-2xl font-bold mb-4">Bus Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p>
              <span className="font-semibold">Bus Number:</span>{" "}
              {busDetails.busDetails.number}
            </p>
            <p>
              <span className="font-semibold">Route:</span>{" "}
              {busDetails.busDetails.route}
            </p>
            <p>
              <span className="font-semibold">Total Seats:</span>{" "}
              {busDetails.busDetails.seats}
            </p>
            <p>
              <span className="font-semibold">Reserved Seats:</span>{" "}
              {busDetails.reservedSeats.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Available Seats:</span>{" "}
              {busDetails.busDetails.seats - busDetails.reservedSeats.length}
            </p>
          </div>

          {/* Reservations Table */}
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-xl font-bold mb-4">Reservations</h3>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b py-2 px-4">Seat Number</th>
                  <th className="border-b py-2 px-4">Passenger Name</th>
                  <th className="border-b py-2 px-4">Email</th>
                  <th className="border-b py-2 px-4">Phone</th>
                </tr>
              </thead>
              <tbody>
                {busDetails.reservations.map((reservation) => (
                  <tr
                    key={reservation._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="border-b py-2 px-4">{reservation.seatNumber}</td>
                    <td className="border-b py-2 px-4">{reservation.passengerName}</td>
                    <td className="border-b py-2 px-4">{reservation.passengerEmail}</td>
                    <td className="border-b py-2 px-4">{reservation.passengerPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
