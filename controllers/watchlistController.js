const Watchlist = require('../models/watchlist');

// Create a new watchlist
exports.createWatchlist = async (req, res) => {
  try {
    const { userId, name } = req.body;
    if (!userId || !name) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const watchlist = new Watchlist(req.body);
    const savedWatchlist = await watchlist.save();
    res.status(201).json(savedWatchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all watchlists
exports.getWatchlists = async (req, res) => {
  try {
    const watchlists = await Watchlist.find();
    res.json(watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a watchlist by ID
exports.getWatchlistById = async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.id);
    if (!watchlist) return res.status(404).json({ error: 'Watchlist not found.' });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a watchlist
exports.updateWatchlist = async (req, res) => {
  try {
    const updatedWatchlist = await Watchlist.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedWatchlist) return res.status(404).json({ error: 'Watchlist not found.' });
    res.json(updatedWatchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a watchlist
exports.deleteWatchlist = async (req, res) => {
  try {
    const deletedWatchlist = await Watchlist.findByIdAndDelete(req.params.id);
    if (!deletedWatchlist) return res.status(404).json({ error: 'Watchlist not found.' });
    res.json({ message: 'Watchlist deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
