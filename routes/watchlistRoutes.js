// routes/watchlistRoutes.js

const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { validateWatchlist } = require('../validators/watchlistValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Watchlist:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *       properties:
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         movies:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /watchlists:
 *   post:
 *     summary: Create a new watchlist
 *     tags: [Watchlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watchlist'
 *     responses:
 *       201:
 *         description: Watchlist created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server error.
 */
router.post('/', validateWatchlist, watchlistController.createWatchlist);

/**
 * @swagger
 * /watchlists:
 *   get:
 *     summary: Retrieve a list of watchlists
 *     tags: [Watchlists]
 *     responses:
 *       200:
 *         description: A list of watchlists.
 *       500:
 *         description: Server error.
 */
router.get('/', watchlistController.getWatchlists);

/**
 * @swagger
 * /watchlists/{id}:
 *   get:
 *     summary: Get a watchlist by ID
 *     tags: [Watchlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The watchlist ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Watchlist found.
 *       404:
 *         description: Watchlist not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', watchlistController.getWatchlistById);

/**
 * @swagger
 * /watchlists/{id}:
 *   put:
 *     summary: Update a watchlist by ID
 *     tags: [Watchlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The watchlist ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watchlist'
 *     responses:
 *       200:
 *         description: Updated watchlist.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Watchlist not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', validateWatchlist, watchlistController.updateWatchlist);

/**
 * @swagger
 * /watchlists/{id}:
 *   delete:
 *     summary: Delete a watchlist by ID
 *     tags: [Watchlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The watchlist ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Watchlist deleted successfully.
 *       404:
 *         description: Watchlist not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', watchlistController.deleteWatchlist);

module.exports = router;