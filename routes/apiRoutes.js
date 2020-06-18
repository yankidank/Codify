const router = require('express').Router();
const { users, companies, contacts, jobs, reports } = require('../controllers');

router.use('/users', users);
router.use('/companies', companies);
router.use('/contacts', contacts);
router.use('/jobs', jobs);
router.use('/reports', reports);

module.exports = router;
