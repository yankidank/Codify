const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/users');

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/linkedin/callback',
			scope: ['r_liteprofile', 'r_emailaddress']
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile);

			// ^^ this profile parameter contains all of the information from google that should be stored in the database
			// This is the information that should be stored in the database.
			// When MongoDB returns the new user, it should be passed to the done method (I have created a user object because we don't have a User Schema yet)
			const { id, displayName, emails } = profile;
			User.find({ $or: [{ linkedin: { id: id } }, { email: emails[0].value }] }, (err, user) => {
				// if user already exists
				if (user[0]) {
					user[0].linkedin.id = id;
					user[0].save();
					done(null, user[0]);
				} else {
					// create new user
					User.create({ displayName, email: emails[0].value, linkedin: { id } }, (err, user) => {
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

module.exports = LinkedInStrategy;
