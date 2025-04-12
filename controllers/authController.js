// controllers/authController.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body; // In a production app, you would hash passwords and compare with bcrypt
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // For demonstration only: directly comparing password strings.
    // In production use bcrypt.compare()
    if (user.passwordHash !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ token: 'Bearer ' + token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
