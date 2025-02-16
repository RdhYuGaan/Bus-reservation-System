const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllBuses, addBus, getBusById, getBusesByDriver, deleteBus } = require("../controllers/busController");
const { updateBus } = require("../controllers/driverController");
const verifyToken = require("../middlewares/authMiddleware");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: API endpoints for managing buses
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   driverId:
 *                     type: string
 */
// Route to get all buses
router.get("/", verifyToken, getAllBuses);

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Add a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               driverId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Bus added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 driverId:
 *                   type: string
 */
// Route to add a new bus
router.post("/", verifyToken, upload.single("image"), addBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a specific bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to retrieve
 *     responses:
 *       200:
 *         description: Bus details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 driverId:
 *                   type: string
 *       404:
 *         description: Bus not found
 */
// Route to get a specific bus by ID
router.get("/:id", verifyToken, getBusById);

/**
 * @swagger
 * /api/buses/driver/{driverId}:
 *   get:
 *     summary: Get buses assigned to a specific driver
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the driver
 *     responses:
 *       200:
 *         description: List of buses assigned to the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   driverId:
 *                     type: string
 *       404:
 *         description: No buses found for this driver
 */
// Route to fetch buses for a specific driver
router.get("/driver/:driverId", verifyToken, getBusesByDriver);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to delete
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 */
// Delete a bus (admin or specific driver access)
router.delete("/:id", verifyToken, deleteBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update bus details
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 */
// Update a bus
router.put("/:id", upload.single("image"), updateBus);

module.exports = router;
