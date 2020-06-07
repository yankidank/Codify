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
