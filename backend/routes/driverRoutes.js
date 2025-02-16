const express = require("express");
const { getAllDrivers, deleteDriver, updateBus } = require("../controllers/driverController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: API endpoints for managing drivers
 */

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all drivers
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
 *                   phone:
 *                     type: string
 *                   busId:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
// Get all drivers
router.get("/", verifyToken, getAllDrivers);

/**
 * @swagger
 * /api/drivers/{id}:
 *   delete:
 *     summary: Delete a specific driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the driver to delete
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Driver deleted successfully
 *       404:
 *         description: Driver not found
 *       401:
 *         description: Unauthorized access
 */
// Delete a specific driver
router.delete("/:id", verifyToken, deleteDriver);

module.exports = router;
