const express = require("express");
const router = express.Router();
const {
  getReservationsByBusId,
  createReservation,
  verifyQRCode,
  getReservationBusDetails
} = require("../controllers/reservationController");
const verifyToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API endpoints for managing bus reservations
 */

/**
 * @swagger
 * /api/reservations/{busId}:
 *   get:
 *     summary: Get all reservations for a specific bus
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to fetch reservations for
 *     responses:
 *       200:
 *         description: List of all reservations for the specified bus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   seatNumber:
 *                     type: number
 *                   busId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Bus not found
 */
// Route to get all reservations for a specific bus
router.get("/:busId", verifyToken, getReservationsByBusId);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *                 description: ID of the bus to reserve a seat
 *               userId:
 *                 type: string
 *                 description: ID of the user making the reservation
 *               seatNumber:
 *                 type: number
 *                 description: Seat number to reserve
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 seatNumber:
 *                   type: number
 *                 busId:
 *                   type: string
 *       400:
 *         description: Bad request or validation error
 */
// Route to create a new reservation
router.post("/", verifyToken, createReservation);

/**
 * @swagger
 * /api/reservations/verify:
 *   post:
 *     summary: Verify a reservation using a QR code
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qrCode:
 *                 type: string
 *                 description: QR code to verify the reservation
 *     responses:
 *       200:
 *         description: QR code successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: QR code verified successfully
 *       400:
 *         description: Invalid QR code
 */
// Route to verify QR Code
router.post("/verify", verifyToken, verifyQRCode);

/**
 * @swagger
 * /api/reservations/bus-details/{busId}:
 *   get:
 *     summary: Admin view of bus reservation details
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to fetch details for
 *     responses:
 *       200:
 *         description: Detailed bus reservation data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busId:
 *                   type: string
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       seatNumber:
 *                         type: number
 *       404:
 *         description: Bus not found
 */
// Admin view of bus details
router.get("/bus-details/:busId", getReservationBusDetails);

module.exports = router;
