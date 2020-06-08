const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Google Oauth strategy configuration
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile)

			// ^^ this profile parameter contains all of the information from google that should be stored in the database
			// This is the information that should be stored in the database. 
			// When MongoDB returns the new user, it should be passed to the done method (I have created a user object because we don't have a User Schema yet)
			const { id, displayName, emails } = profile;
			let newUser = {
				googleID: id,
				displayName,
				email: emails[0].value
			};
			done(null, newUser);
		}
	)
);

module.exports = GoogleStrategy;