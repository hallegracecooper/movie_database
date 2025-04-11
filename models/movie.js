// models/movie.js

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  cast: [{ type: String }],
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10 },
  duration: { type: Number, required: true }, // duration in minutes
  synopsis: { type: String }
});

module.exports = mongoose.model('Movie', MovieSchema);
