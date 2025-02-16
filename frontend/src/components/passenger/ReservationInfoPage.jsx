import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { number } from "prop-types";
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";


const PassengerInfoPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bus, selectedSeats } = location.state || {}; // Get data from the previous page
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { openSuccess, openAlert, openWarning } = useModal();
  const { startLoading, stopLoading } = useLoader();
  

  if (!bus || !selectedSeats) {
    return <p>No reservation data available. Please reserve your seats first.</p>;
  }

  console.log(bus);

  const handleReservation = async () => {
    if (!fullName || !email || !phone) {
      // alert("Please fill in all passenger details.");
      openWarning("Please fill in all passenger details.");
      return;
    }

    setLoading(true);
    

    try {
      startLoading();
      // Create a reservation object containing all details
      const reservationData = {
        busId: bus._id,
        seats: selectedSeats, // Array of selected seats
        busDetails:{
          route:bus.route,
          number:bus.number,       
          departureTime:bus.departureTime,
          arrivalTime:bus.arrivalTime,

        },
        passengerDetails: {
          fullName,
          email,
          phone,
        },
        userId: user.id, // From AuthContext
        totalAmount: selectedSeats.length * 750, // Calculate total amount
        date: new Date().toISOString().split("T")[0], // Current date
      };

      // Send reservation data to the backend
      const res = await api.post("/reservations", reservationData);

      
        // Extract QR Code from the response
    const qrCodeUrl = res.data.qrCode; 

    // Navigate to the QR Code page
    navigate("/qr-code", {
      state: { qrCode: qrCodeUrl, reservation: res.data.reservations }, // Pass QR code and reservation data
    });
    } catch (err) {
      alert(err.response?.data?.message || "Reservation failed");
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 p-10 max-w-5xl">
        {/* Passenger Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Passenger Information</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="e.g. johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2"
            />
            <small className="text-gray-500">You will get tickets via this email address.</small>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Phone</label>
            <input
              type="text"
              placeholder="e.g. +1 234 567 890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Booking Summary */}
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Your Booking Status</h3>
            <p>
              <strong>Your Destination:</strong> {bus.route}
            </p>
            <p>
              <strong>Arrival at:</strong> {bus.arrivalTime} <br />
              <strong>Depart at:</strong> {bus.departureTime}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Total No. of Seats:</strong> {selectedSeats.length}
            </p>
            <p className="text-2xl">
              <strong>Total Amount:</strong> Rs. {selectedSeats.length * 750}
            </p>
          </div>

          <button
            onClick={handleReservation}
            className={`w-full mt-6 py-2 px-4 rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Confirm"}
          </button>

        </div>

      

      </div>
    </div>
  );
};

export default PassengerInfoPage;
