const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = require('express').Router();
// Google Oauth strategy configuration
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			if (true) {
				return done();
			}
			// write a function to create a new user

			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			// 	return done(err, user);
			// });
		}
	)
);

// Google Oauth Routes
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/login/success',
		failureRedirect: '/login/failure'
	})
);

module.exports = router;
