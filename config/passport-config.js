const passport = require('passport');
const User = require('../models/users');

// passport serialization
passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser(async (_id, done) => {
	// find in the database by id
	let user = await User.findById(_id);
	done(null, user);
});

module.exports = passport;
