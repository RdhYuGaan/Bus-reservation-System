Bus Ticket Booking System

A web-based bus ticket booking system built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows passengers to book tickets, generate QR codes for their bookings, and enables admins and bus controllers to manage buses and verify tickets.

Features

User Roles:

Admin: Manages buses, routes, and views all bookings.

Passenger: Searches for buses, books tickets, and generates QR codes for bookings.

Bus Controller: Verifies QR codes and manages bus schedules.

Ticket Booking:

Passengers can search for available buses and book tickets.

QR codes are generated for each booking.

QR Code Verification:

Bus controllers can scan and verify QR codes to validate tickets.

Bus Management:

Admins can add, update, or delete buses and routes.

Technologies Used

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

QR Code Generation: qrcode library

Authentication: JSON Web Tokens (JWT)

Styling: CSS or a library like TailwindCSS/Bootstrap

Installation and Setup

Prerequisites

Node.js and npm installed on your machine.

MongoDB installed or a MongoDB Atlas connection string.

Steps to Run the Project

Clone the Repository:

git clone https://github.com/RdhYuGaan/Bus-reservation-System.git
cd Bus-reservation-System

Install Dependencies:

For the backend:

cd backend
npm install

For the frontend:

cd ../frontend
npm install

Set Up Environment Variables:

Create a .env file in the backend folder and add the following:

MONGO_URI=mongodb://localhost:27017/bus-booking
JWT_SECRET=your_jwt_secret
PORT=5000

Run the Backend Server:

cd backend
npm start

Run the Frontend Server:

cd ../frontend
npm start

Access the Application:

Open your browser and go to http://localhost:3000.

API Endpoints

Admin Routes

Add a Bus: POST /api/buses

View All Bookings: GET /api/bookings

Passenger Routes

Search Buses: GET /api/buses/search

Book a Ticket: POST /api/bookings

Generate QR Code: GET /api/bookings/:id/qr

Bus Controller Routes

Verify QR Code: POST /api/bookings/verify

Add/Update Bus Schedule: POST /api/buses

Folder Structure

bus-ticket-booking-system/
├── backend/
│   ├── models/              # MongoDB models (User, Bus, Booking)
│   ├── controllers/         # Controllers for routes
│   ├── routes/              # API routes
│   ├── config/              # Database and JWT configuration
│   ├── .env                 # Environment variables
│   └── server.js            # Entry point for the backend
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Pages (Admin, Passenger, Bus Controller)
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point for the frontend
│   └── package.json         # Frontend dependencies
│
└── README.md                # Project documentation

Screenshots





Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch:

git checkout -b feature/YourFeatureName

Commit your changes:

git commit -m 'Add some feature'

Push to the branch:

git push origin feature/YourFeatureName

Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For any questions or feedback, feel free to reach out:

Email: radithyugan22@gmail.com


GitHub: RdhYuGaan

