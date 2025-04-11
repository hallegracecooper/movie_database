// controllers/movieController.js

const Movie = require('../models/movie');

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    // Basic validation, you can use express-validator for more robust validation.
    if (!req.body.title || !req.body.director || !req.body.releaseDate || !req.body.genre || !req.body.duration) {
      return res.status(400).json({ error: 'Missing required movie fields.' });
    }
    
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found.' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) return res.status(404).json({ error: 'Movie not found.' });
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: 'Movie not found.' });
    res.json({ message: 'Movie deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
