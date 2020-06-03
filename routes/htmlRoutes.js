const router = require('express').Router();

function authCheck(req, res, next) {
	next();
}

router.get('/', authCheck, (req, res) => {
	res.send('you have successfully logged in!');
});
// authenticating users
router.get('/login/success', (req, res) => {
	res.send('you have successfully logged in!');
});
router.get('/login/failure', (req, res) => {
	res.send('you have failed to log in');
});
router.get('/logout');

module.exports = router;
