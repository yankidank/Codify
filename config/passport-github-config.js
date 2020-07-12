const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_DOMAIN}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, profileUrl, _json } = profile;
      try {
        let user = await User.find({
          $or: [{ linkedin: { id: id } }, { email: _json.email }],
        });
        // if user is already in the database
        if (user[0]) {
          // ensure that user has github profile stuff
          user[0].github.id = id;
          user[0].github.url = profileUrl;
          user[0].save();
          done(null, user[0]);
        } else {
          let newUser = await User.create({
            displayName,
            email: _json.email,
            github: { id, url: profileUrl },
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
