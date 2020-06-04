const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport serialization
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	done(null, user);
});

// Google Oauth strategy configuration
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, { user_id: 12345 });
			// write a function to create a new user

			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return done(err, user);
			// });
		}
	)
);

module.exports = GoogleStrategy;
