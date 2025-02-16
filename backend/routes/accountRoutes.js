const express = require("express");
const { getAllAccounts, deleteAccount } = require("../controllers/accountController");

const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API endpoints for managing accounts
 */

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []  # Add this if your API uses JWT authentication
 *     responses:
 *       200:
 *         description: A list of all accounts
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
 *                   email:
 *                     type: string
 */
// Get all accounts
router.get("/", verifyToken, getAllAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Delete a specific account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the account to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Add this if your API uses JWT authentication
 *     responses:
 *       200:
 *         description: Account successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deleted successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
// Delete a specific account
router.delete("/:id", verifyToken, deleteAccount);

module.exports = router;
