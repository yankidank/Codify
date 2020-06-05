const passport = require('passport');
const router = require('express').Router();
// login/logout routes
router.get('/logout');

// Google Oauth Routes
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email']
	})
);
router.get(
	'/google/callback',
	passport.authenticate('google', { successRedirect: '/dashboard', failureRedirect: '/' })
);

// Github Oauth Routes
router.get('/github', passport.authenticate('github'));
router.get(
	'/github/callback',
	passport.authenticate('github', { successRedirect: '/dashboard', failureRedirect: '/' })
);

module.exports = router;
