const router = require('express').Router();

const { users, companies } = require('../controllers');

router.use('/users', users);
router.use('/companies', companies);

module.exports = router;
