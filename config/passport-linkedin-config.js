const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/linkedin/callback',
			scope: ['r_liteprofile', 'r_emailaddress']
		},
		function (accessToken, refreshToken, profile, done) {
			// console.log(profile)

			// ^^ this profile parameter contains all of the information from google that should be stored in the database
			// This is the information that should be stored in the database. 
			// When MongoDB returns the new user, it should be passed to the done method (I have created a user object because we don't have a User Schema yet)
			const {id, displayName, emails} = profile
			let newUser = {
				linkedinId: id,
				displayName, 
				email: emails[0].value
			}
			done(null, newUser);
		}
	)
);

module.exports = LinkedInStrategy;
