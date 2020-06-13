const router = require('express').Router();
const { users, companies, contacts, jobs } = require('../controllers');

router.use('/users', users);
router.use('/companies', companies);
router.use('/contacts', contacts);
router.use('/jobs', jobs);

module.exports = router;
