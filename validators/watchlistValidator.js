// validators/watchlistValidator.js
const { body, validationResult } = require('express-validator');

const validateWatchlist = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('name').notEmpty().withMessage('Watchlist name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateWatchlist };
