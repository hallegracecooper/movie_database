// validators/movieValidator.js
const { body, validationResult } = require('express-validator');

const validateMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('releaseDate')
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be between 0 and 10'),
  // Custom middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateMovie };