const router = require('express').Router();

function authCheck(req, res, next) {
	next();
}

router.get('/', authCheck, (req, res) => {
	res.send('you have successfully logged in!');
});

module.exports = router;
