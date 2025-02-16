const mongoose = require("mongoose");
const Bus = require("../models/Bus");

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    // Fetch all buses from the database
    const buses = await Bus.find();

    // Map through buses and add full image URL
    const busesWithImages = buses.map((bus) => ({
      ...bus.toObject(), // Convert Mongoose document to plain object
      image: bus.image ? `${req.protocol}://${req.get("host")}/${bus.image}` : null, // Construct full image URL
    }));

    res.status(200).json(busesWithImages);
  } catch (err) {
    console.error("Error fetching buses:", err);
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};


// Add a new bus
const addBus = async (req, res) => {
  try {
    const { number, route, seats, departureTime, arrivalTime, date, driverId } = req.body;

    // Validate required fields
    if (!number || !route || !seats || !departureTime || !arrivalTime || !date || !driverId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle image file (if uploaded)
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Create and save the bus
    const bus = new Bus({
      number,
      route,
      seats,
      departureTime,
      arrivalTime,
      date,
      driverId,
      image: imagePath, // Save image path if provided
    });
    await bus.save();

    // Construct a full image URL in the response
    const fullBusData = {
      ...bus._doc,
      image: imagePath ? `${req.protocol}://${req.get("host")}${imagePath}` : null,
    };


    res.status(201).json({
      message: "Bus added successfully",
      bus: fullBusData,
    });



  } catch (error) {
    console.error("Error adding bus:", error);
    res.status(500).json({ message: "Failed to add bus" });
  }
};

// Get a specific bus by ID
const getBusById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Add full URL for the image if it exists
    const busWithImage = {
      ...bus._doc,
      image: bus.image
        ? `${req.protocol}://${req.get("host")}${bus.image}`
        : null,
    };

    res.json(busWithImage);
  } catch (err) {
    console.error("Error fetching bus details:", err);
    res.status(500).json({ message: "Failed to fetch bus details" });
  }
};


// Fetch buses for a specific driver
const getBusesByDriver = async (req, res) => {
  const { driverId } = req.params; // Get driverId from URL params

  try {
    // Validate driverId
    if (!mongoose.isValidObjectId(driverId)) {
      return res.status(400).json({ message: "Invalid Driver ID" });
    }

    // Fetch buses assigned to the driver
    const buses = await Bus.find({ driverId });

    // Check if buses are found
    if (buses.length === 0) {
      return res.status(404).json({ message: "No buses found for this driver" });
    }

    // Map through buses to construct full image URLs
    const busesWithImages = buses.map((bus) => ({
      ...bus.toObject(), // Convert Mongoose document to plain object
      image: bus.image ? `${req.protocol}://${req.get("host")}${bus.image}` : null, // Construct full image URL
    }));

    res.status(200).json(busesWithImages);
  } catch (err) {
    console.error("Error fetching buses for driver:", err);
    res.status(500).json({ message: "Failed to fetch buses for this driver", error: err.message });
  }
};


const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete bus", error: err.message });
  }
};


module.exports = { getAllBuses, addBus, getBusById, getBusesByDriver, deleteBus };
