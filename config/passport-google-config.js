const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/users');

// Google Oauth strategy configuration
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			const { id, displayName, emails } = profile;
			// check if user is already in database
			User.find({ $or: [{ google: { id: id } }, { email: emails[0].value }] }, (err, user) => {
				// if user already exists
				if (user[0]) {
					user[0].google.id = id;
					user[0].save();
					done(null, user[0]);
				} else {
					// create new user
					User.create({ displayName, email: emails[0].value, google: { id } }, (err, user) => {
						if (err) {
							done(err, false);
						} else {
							done(null, user);
						}
					});
				}
			});
		}
	)
);

module.exports = GoogleStrategy;
