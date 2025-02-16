const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const driverRoutes = require("./routes/driverRoutes");
const accountRoutes = require("./routes/accountRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const swaggerDocs = require("./config/swaggerConfig");
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/drivers", driverRoutes); // Driver routes
app.use("/api/accounts", accountRoutes); // Account routes
// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));
app.use("/api/feedbacks", feedbackRoutes);


require('dotenv').config();

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Connection

const mongoURI = process.env.MONGO_URI;


mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
