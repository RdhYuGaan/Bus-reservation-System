import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext for managing authentication
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const AddBus = () => {
  const { user } = useAuth(); // Get the logged-in user's data (e.g., driver ID)
  const [busDetails, setBusDetails] = useState({
    number: "",
    route: "",
    seats: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
  });

  const [image, setImage] = useState(null); // State for the image
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(""); // Error message
  const { openSuccess, openAlert, openWarning } = useModal();
  const { startLoading, stopLoading } = useLoader();
  

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleAddBus = async () => {
    if (
      !busDetails.number ||
      !busDetails.route ||
      !busDetails.seats ||
      !busDetails.departureTime ||
      !busDetails.arrivalTime ||
      !busDetails.date ||
      !image
    ) {
      // setError("Please fill in all fields and upload an image");
      openAlert("Please fill in all fields and upload an image");
      return;
    }

    setLoading(true);
    setError("");

    try {
      

      startLoading();

      const formData = new FormData();
      formData.append("number", busDetails.number);
      formData.append("route", busDetails.route);
      formData.append("seats", busDetails.seats);
      formData.append("departureTime", busDetails.departureTime);
      formData.append("arrivalTime", busDetails.arrivalTime);
      formData.append("date", busDetails.date);
      formData.append("driverId", user?.id); // Include the driver's ID
      formData.append("image", image); // Attach the image file

      console.log(formData);

      const res = await api.post("/buses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // alert(res.data.message);
      openSuccess(res.data.message);

      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
      setImage(null);
    } catch (err) {
      // setError(err.response?.data?.message || "Failed to add bus");
      openAlert(err.response?.data?.message);
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  return (
  
    <div className="bg-gradient-to-br from-gray-500 via-gray-200 to-gray-800 text-white rounded-lg shadow-xl p-8 space-y-8 animate-fade-in">
  {/* Title Section */}
  <div className="text-center">
    <h2 className="text-4xl font-extrabold mb-2">Add a New Bus</h2>
    <p className="text-gray-300 text-sm">Fill in the details to add a new bus to the system.</p>
  </div>

  {/* Error Message */}
  {error && (
    <div className="bg-red-600 bg-opacity-75 text-white py-3 px-4 rounded-lg">
      <p>{error}</p>
    </div>
  )}

  {/* Input Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Bus Number</label>
      <input
        type="text"
        name="number"
        placeholder="Enter Bus Number"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.number}
        onChange={handleInputChange}
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium mb-1">Route</label>
      <input
        type="text"
        name="route"
        placeholder="Enter Route"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.route}
        onChange={handleInputChange}
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium mb-1">Seats</label>
      <input
        type="number"
        name="seats"
        placeholder="Enter Number of Seats"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.seats}
        onChange={handleInputChange}
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium mb-1">Departure Time</label>
      <input
        type="time"
        name="departureTime"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.departureTime}
        onChange={handleInputChange}
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium mb-1">Arrival Time</label>
      <input
        type="time"
        name="arrivalTime"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.arrivalTime}
        onChange={handleInputChange}
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium mb-1">Date</label>
      <input
        type="date"
        name="date"
        className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
        value={busDetails.date}
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Image Upload Section */}
  <div className="relative">
    <label className="block text-sm font-medium mb-2">Upload Bus Image</label>
    <div className="relative border-dashed border-2 border-gray-500 p-6 rounded-lg bg-gray-100 hover:bg-gray-800 text-center transition-all cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div className="text-gray-400">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Bus Preview"
            className="w-32 h-32 mx-auto rounded-lg object-cover"
          />
        ) : (
          <p className="text-sm">Click to upload image</p>
        )}
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button
    className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-gray-900 hover:bg-gray-800"
    }`}
    onClick={handleAddBus}
    disabled={loading}
  >
    {loading ? (
      <div className="flex items-center justify-center space-x-3">
        <span>Adding Bus...</span>
        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
      </div>
    ) : (
      "Add Bus"
    )}
  </button>
</div>

  
  );
};

export default AddBus;
