import React, { useState, useEffect } from "react";
import axios from "axios";
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";
import AssignBusDriver from "./AssignBusDrivers";
import UpdateBusDriver from "./UpdateBusDriver";
import BusList from "./BusList";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showBuses, setShowBuses] = useState(null);
  const [AddDriver, setAddDriver] = useState(false);
  const { startLoading, stopLoading } = useLoader();
  const { openSuccess, openAlert, openWarning, openConfirm } = useModal();
  const [busDetails, setBusDetails] = useState({
    number: "",
    route: "",
    seats: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
  });
  const [image, setImage] = useState(null); // For bus image upload

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        startLoading();
        const res = await api.get("/drivers");
        setDrivers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch drivers");
      } finally {
        stopLoading();
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (driverId) => {
    openConfirm(
      "Are you sure you want to delete this driver?",
      async () => {
        try {
          // Perform the delete operation
          await api.delete(`/drivers/${driverId}`);
          setDrivers((prev) => prev.filter((driver) => driver._id !== driverId));
          openSuccess("Driver deleted successfully!");
        } catch (err) {
          // Handle errors using openAlert for better user feedback
          openAlert(err.response?.data?.message || "Failed to delete driver");
        }
      },
      "Confirm Delete"
    );
  };


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAssignBus = async () => {
    if (!selectedDriver) return;

    // Ensure all fields are filled
    if (
      !busDetails.number ||
      !busDetails.route ||
      !busDetails.seats ||
      !busDetails.departureTime ||
      !busDetails.arrivalTime ||
      !busDetails.date
    ) {
      // alert("Please fill in all bus details");
      openWarning("Please fill in all bus details");
      return;
    }

    const formData = new FormData();
    formData.append("number", busDetails.number);
    formData.append("route", busDetails.route);
    formData.append("seats", busDetails.seats);
    formData.append("departureTime", busDetails.departureTime);
    formData.append("arrivalTime", busDetails.arrivalTime);
    formData.append("date", busDetails.date);
    formData.append("driverId", selectedDriver._id);
    if (image) formData.append("image", image);

    try {
      await api.post("/buses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // alert("Bus assigned successfully!");
      openSuccess("Bus assigned successfully!");
      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
      setImage(null);
      setSelectedDriver(null); // Close modal
    } catch (err) {
      // alert(err.response?.data?.message || "Failed to assign bus");
      openAlert(err.response?.data?.message);
    }
  };
  console.log(showBuses)

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      <div className=" grid grid-cols-10 grid-rows-2">
        <h2 className="text-2xl font-bold mb-4">Drivers</h2>
        <button
          className="  bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700"
          onClick={() => setAddDriver(true)}
        >
          Add
        </button>
      </div>
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <ul className="space-y-4">
          {drivers.map((driver) => (
            <li key={driver._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p>
                <strong>Name:</strong> {driver.name}
              </p>
              <p>
                <strong>Email:</strong> {driver.email}
              </p>
              <p>
                <strong>Bus Count:</strong> {driver.busCount}
              </p>
              <p>
                {/* <strong>Phone:</strong> {driver.phone} */}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-gray-900 text-white py-1 px-3 rounded hover:bg-gray-700"
                  onClick={() => handleDelete(driver._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-100 border border-black text-black py-1 px-3 rounded hover:bg-gray-600"
                  onClick={() => setSelectedDriver(driver)}
                >
                  Assign Bus
                </button>
                <button
                  className="bg-gray-100 border border-black text-black py-1 px-3 rounded hover:bg-gray-600"
                  onClick={() => setShowBuses(driver)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Assign Bus Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDriver(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
              Assign Bus to <span className="text-gray-600">{selectedDriver.name}</span>
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
                  <option value="Embilipitiya to Colombo">Embilipitiya to Colombo</option>
                  <option value="Monaragala to Colombo">Monaragala to Colombo</option>
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
                Upload Bus Image
              </label>
              <div className="relative border-dashed border-2 border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
              onClick={handleAssignBus}
            >
              Assign Bus
            </button>

          </div>
        </div>


      )}

      {/* Assign Bus Modal */}
      {AddDriver && (
        <AssignBusDriver
          onClose={() => setAddDriver(false)}
        />


      )}
      {/* Show Bus List Modal */}
      {showBuses && (
        <BusList
          driverID={showBuses}
          onClose={() => setShowBuses(null)}
        />
      )}
    </div>
  );
};

export default DriversList;
