const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport serialization
passport.serializeUser((user, done) => {
	done(null, user.displayName);
});
passport.deserializeUser((displayName, done) => {
	// find in the database by id
	done(null, displayName);
});

module.exports = passport;
