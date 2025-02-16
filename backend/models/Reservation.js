
const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: Number, required: true },
  passengerName: { type: String, required: true },
  passengerEmail: { type: String, required: true },
  passengerPhone: { type: String, required: true },
  busNumber: { type: String, required: true },
  busRoute: { type: String, required: true },
  busArrivalTime: { type: String, required: true },
  busDepartureTime: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
