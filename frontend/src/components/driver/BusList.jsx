import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const BusList = () => {
  const { user } = useAuth(); // Get logged-in driver's ID
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { openSuccess, openAlert, openWarning } = useModal();
  const { startLoading, stopLoading } = useLoader();
 

  

  useEffect(() => {
    const fetchDriverBuses = async () => {
      try {
        startLoading();
        const res = await api.get(`/buses/driver/${user.id}`);
        setBuses(res.data); // Set the filtered buses
        console.log(buses.image);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
        openAlert(err.response?.data?.message);
        
      } finally {
        stopLoading();
        setLoading(false);
      }
    };

    fetchDriverBuses();
  }, [user.id]);

  const handleOpenQR = (busId) => {
    console.log(busId)
    navigate("/verify-code", { state: { busId } }); // Pass the busId to the QR verification page
  };

  if (loading) return <p>Loading buses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <h2 className="text-3xl font-bold mb-6 text-gray-700">My Buses</h2>
      
      {buses.length === 0 ? (
        <p>No buses found for this driver.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         
          {buses.map((bus) => (
            
            <div
              key={bus._id}
              onClick={() => handleOpenQR(bus._id)}
              className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={bus.image} // Random bus image
                  alt="Bus"
                  className="w-full h-40 object-cover"
                />
                
                <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs">
                  {new Date(bus.date).toLocaleDateString()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{bus.number}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Route:</strong> {bus.route}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Seats:</strong> {bus.seats}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Departure:</strong> {bus.departureTime}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Arrival:</strong> {bus.arrivalTime}
                </p>
              </div>
              <div className="bg-gray-800 text-white text-center py-2">
                <p className="font-semibold">Open QR Verification</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusList;
