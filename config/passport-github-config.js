const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users');

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/github/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			const { id, displayName, profileUrl, _json } = profile;
			User.find({ $or: [{ linkedin: { id: id } }, { email: _json.email }] }, (err, user) => {
				if (err) throw err;
				// if user already exists
				if (user[0]) {
					user[0].github.id = id;
					user[0].github.url = profileUrl;
					user[0].save();
					done(null, user[0]);
				} else {
					// create new user
					User.create({ displayName, email: _json.email, github: { id, url: profileUrl } }, (err, user) => {
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
