// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateReview } = require('../validators/reviewValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - movieId
 *         - userId
 *         - reviewText
 *         - rating
 *       properties:
 *         movieId:
 *           type: string
 *         userId:
 *           type: string
 *         reviewText:
 *           type: string
 *         rating:
 *           type: number
 *         reviewDate:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server error.
 */
router.post('/', validateReview, reviewController.createReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve a list of reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of reviews.
 *       500:
 *         description: Server error.
 */
router.get('/', reviewController.getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The review ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The review ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Updated review.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', validateReview, reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The review ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', reviewController.deleteReview);

module.exports = router;