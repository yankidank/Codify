const router = require('express').Router();

function authCheck(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/', (req, res) => {
	res.send('<a href="/auth/google">Log in with google</a>');
});
router.get('/dashboard', authCheck, (req, res) => {
	res.send(`<h1>Welcome ${req.user}</h1>`);
});

module.exports = router;
