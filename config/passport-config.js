const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport serialization
passport.serializeUser((user, done) => {
	done(null, user.displayName);
});
passport.deserializeUser((displayName, done) => {
	// find in the database by id
	done(null, displayName);
});

// Google Oauth strategy configuration
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			// write a function to create a new user
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return done(err, user);
			// });
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
