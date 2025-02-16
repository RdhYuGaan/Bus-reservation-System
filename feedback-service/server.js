const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const feedbackRoutes = require("./routes/feedbackRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/feedbacks", feedbackRoutes);

require('dotenv').config();

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
app.listen(5001, () => {
    console.log("Server running on port 5001");
});
