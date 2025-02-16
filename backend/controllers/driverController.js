
const Driver = require("../models/User"); // Assuming User model has a role field
const mongoose = require("mongoose");
const Bus = require("../models/Bus");

// Fetch all drivers
const getAllDrivers = async (req, res) => {
  try {
    // Fetch all drivers
    const drivers = await Driver.find({ role: "driver" }).lean(); // Fetch as plain objects for easier manipulation

    // Add the bus count for each driver
    const driverWithBusCount = await Promise.all(
      drivers.map(async (driver) => {
        const busCount = await Bus.countDocuments({ driverId: driver._id });
        return {
          ...driver,
          busCount,
        };
      })
    );

    res.status(200).json(driverWithBusCount);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers", error: err.message });
  }
};


// Delete a specific driver
const deleteDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid driver ID" });
  }

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete driver", error: err.message });
  }
};

// Update bus details
const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) updates.image = req.file.path;

    const updatedBus = await Bus.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (err) {
    res.status(500).json({ message: "Failed to update bus", error: err.message });
  }
};


module.exports = { getAllDrivers, deleteDriver, updateBus };
