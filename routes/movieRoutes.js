// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - director
 *         - releaseDate
 *         - genre
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *         director:
 *           type: string
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *         releaseDate:
 *           type: string
 *           format: date
 *         genre:
 *           type: string
 *         rating:
 *           type: number
 *         duration:
 *           type: number
 *         synopsis:
 *           type: string
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post('/', movieController.createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
 *       500:
 *         description: Server error.
 */
router.get('/', movieController.getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie found.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', movieController.getMovieById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Updated movie.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', movieController.deleteMovie);

module.exports = router;