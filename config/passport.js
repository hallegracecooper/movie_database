// config/passport.js

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'secretkey'; // Replace or set in your .env

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));
};
