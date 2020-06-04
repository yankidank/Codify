const passport = require('passport');
const router = require('express').Router();
// login/logout routes
router.get('/login/success', (req, res) => {
	res.send('you have successfully logged in!');
});
router.get('/login/failure', (req, res) => {
	res.send('you have failed to log in');
});
router.get('/logout');

// Google Oauth Routes
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/auth/login/success',
		failureRedirect: '/auth/login/failure'
	})
);

module.exports = router;
