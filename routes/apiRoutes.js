const router = require("express").Router();

const { users, companies, contacts} = require('../controllers');

router.use('/users', users);
router.use('/companies', companies);
router.use('/contacts', contacts);


module.exports = router;
