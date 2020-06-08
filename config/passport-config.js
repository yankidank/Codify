const passport = require('passport');

// passport serialization
passport.serializeUser((user, done) => {
	done(null, user.displayName);
});
passport.deserializeUser((displayName, done) => {
	// find in the database by id
	done(null, { displayName });
});

module.exports = passport;
