const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API endpoints for managing feedback
 */

/**
 * @swagger
 * /api/feedback/add:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user submitting feedback
 *               content:
 *                 type: string
 *                 description: The feedback content
 *               rating:
 *                 type: number
 *                 description: Rating given by the user (1-5)
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Feedback submitted successfully
 *       400:
 *         description: Bad request or missing fields
 */
// Submit feedback
router.post("/add", feedbackController.storeFeedback);

/**
 * @swagger
 * /api/feedback/feedbacks:
 *   get:
 *     summary: Retrieve all feedback
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: A list of all feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Feedback ID
 *                   userId:
 *                     type: string
 *                     description: ID of the user who submitted the feedback
 *                   content:
 *                     type: string
 *                     description: The feedback content
 *                   rating:
 *                     type: number
 *                     description: The rating given (1-5)
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the feedback was submitted
 */
// Retrieve all feedback
router.get("/feedbacks", feedbackController.getFeedbacks);

module.exports = router;
