const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');

// Google Oauth strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      try {
        let user = await User.find({
          $or: [{ google: { id: id } }, { email: emails[0].value }],
        });
        // if user is already in the database
        if (user[0]) {
          // ensure that user has google profile stuff
          user[0].google.id = id;
          user[0].save();
          done(null, user[0]);
        } else {
          let newUser = await User.create({
            displayName,
            email: emails[0].value,
            google: { id },
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = GoogleStrategy;
