const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const { generateQRCode } = require("../utils/qrUtil");
const sendEmail = require("../utils/emailUtil");
const Bus = require("../models/Bus");

const generateEmailTemplate = require("../simulation/emailTemplate");
// Get all reservations for a specific bus
const getReservationsByBusId = async (req, res) => {
  try {
    const { busId } = req.params;

    // Check if the bus ID is valid
    if (!mongoose.isValidObjectId(busId)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    const reservations = await Reservation.find({ busId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};


// Create a new reservation
const createReservation = async (req, res) => {
    try {
      const { busId, seats, passengerDetails, busDetails, userId, totalAmount, date } = req.body;
  
      // Validate input
      if (!busId || !seats || !passengerDetails || !userId || !totalAmount || !date ||  !busDetails) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if busId is valid
      if (!mongoose.isValidObjectId(busId)) {
        return res.status(400).json({ message: "Invalid bus ID" });
      }
  
      // Check for already reserved seats
      const existingReservations = await Reservation.find({
        busId,
        seatNumber: { $in: seats },
      });
  
      if (existingReservations.length > 0) {
        return res.status(400).json({
          message: `Seats ${existingReservations.map((r) => r.seatNumber).join(", ")} are already reserved.`,
        });
      }
  
      // Create reservations for all seats
      const reservations = seats.map((seat) => ({
        busId,
        seatNumber: seat,
        passengerName: passengerDetails.fullName,
        passengerEmail: passengerDetails.email,
        passengerPhone: passengerDetails.phone,
        busNumber: busDetails.number,
        busRoute: busDetails.route,
        busArrivalTime: busDetails.arrivalTime,
        busDepartureTime: busDetails.departureTime,
        userId,
        date,
        totalAmount: totalAmount / seats.length, // Split amount per seat
      }));
  
      const savedReservations = await Reservation.insertMany(reservations);
      const qrData = {
        reservationIds: savedReservations.map((r) => r._id),
        busDetails: { route: busDetails.route, number: busDetails.number }, // Ensure this comes from request or related logic
        seats,
        passenger: passengerDetails,
        totalAmount,
        date,
      };
  
      // Generate QR Code Buffer
    const qrCodeBuffer = await generateQRCode(qrData);

    // Prepare Email Content
    const emailHtml = generateEmailTemplate({
      fullName: passengerDetails.fullName,
      busDetails: qrData.busDetails,
      seats,
      totalAmount,
      qrCodeBase64: `cid:qrcode`, // Embed QR Code in the email
    });

    // Send Email with QR Code
    await sendEmail(passengerDetails.email, "Reservation Confirmation", emailHtml, qrCodeBuffer);

  
          // Respond to the client
    res.status(201).json({
        message: "Reservation successful! Confirmation email sent.",
        reservations: savedReservations,
        qrCode : `data:image/png;base64,${qrCodeBuffer.toString("base64")}`, // Pass QR code as Base64 for frontend
      });
    } catch (err) {
      console.error("Error creating reservation:", err);
      res.status(500).json({ message: "Failed to create reservation" });
    }
  };
  
// Verify QR Code
const verifyQRCode = async (req, res) => {
  try {
    const { reservationIds, busId, date } = req.body;

    if (!reservationIds || !busId || !date) {
      return res.status(400).json({ message: "Missing required fields for verification" });
    }

    // Find reservations matching the given IDs, busId, and date
    const reservations = await Reservation.find({
      _id: { $in: reservationIds },
      busId: busId,
      date: date,
    });

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No matching reservations found" });
    }

    res.status(200).json({
      message: "QR Code Verified Successfully",
      reservations,
    });
  } catch (err) {
    console.error("Error verifying reservation:", err.message);
    res.status(500).json({ message: "Failed to verify reservation" });
  }
};

const getReservationBusDetails = async (req, res) => {
  try {
    const { busId } = req.params;

    // Validate bus ID
    if (!mongoose.isValidObjectId(busId)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    // Fetch all reservations
    const reservations = await Reservation.find({ busId });

    // Fetch bus details
    const busDetails = await Bus.findById(busId);
    if (!busDetails) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const totalSeats = busDetails.totalSeats;
    const reservedSeats = reservations.map((res) => res.seatNumber);
    const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(
      (seat) => !reservedSeats.includes(seat)
    );

    res.status(200).json({
      busDetails,
      reservations,
      totalSeats,
      reservedSeats,
      availableSeats,
    });
  } catch (err) {
    console.error("Error fetching admin bus details:", err.message);
    res.status(500).json({ message: "Failed to fetch bus details" });
  }
};


module.exports = {
  getReservationsByBusId,
  createReservation,
  verifyQRCode,
  getReservationBusDetails,
};
