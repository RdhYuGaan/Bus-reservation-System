const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  route: { type: String, required: true },
  seats: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  date: { type: Date, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the driver
  image: { type: String }, // Optional image path
});

module.exports = mongoose.model("Bus", busSchema);
