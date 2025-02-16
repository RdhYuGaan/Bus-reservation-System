const mongoose = require('mongoose');
const Feedback = require('../models/Feedback'); // Adjust the path to your model

(async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect('mongodb://localhost:27017/busReservation', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        // Check if the 'users' collection exists
        const collections = await db.db.listCollections({ name: 'feedback' }).toArray();

        if (collections.length === 0) {
            // If the collection does not exist, create it by inserting an initial document
            console.log("'feedbacks' collection does not exist. Creating it...");
            await Feedback.create({
                name: 'Default User',
                email: 'default@example.com',
                busNumber: '0',
                complaint: 'Not Provided',
            });
            console.log("'feedbacks' collection created successfully.");
        } else {
            console.log("'feedbacks' collection already exists.");
        }

        // Add new field to existing documents if it doesn't exist
        await Feedback.updateMany({ address: { $exists: false } }, { $set: { address: "Not Provided" } });
        console.log("Database updated with the new field.");
    } catch (err) {
        console.error("Error updating database:", err);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
})();
