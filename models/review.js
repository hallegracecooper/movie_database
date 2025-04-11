const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  reviewDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
