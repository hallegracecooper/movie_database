// validators/reviewValidator.js
const { body, validationResult } = require('express-validator');

const validateReview = [
  body('movieId').notEmpty().withMessage('movieId is required'),
  body('userId').notEmpty().withMessage('userId is required'),
  body('reviewText').notEmpty().withMessage('Review text is required'),
  body('rating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be between 0 and 10'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateReview };
