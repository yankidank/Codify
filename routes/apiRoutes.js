const router = require("express").Router();

const { userController } = require('../controllers');

router.use('/users', userController);

// router.get("/posts", (req, res) => {
//   // Use a regular expression to search titles for req.query.q
//   // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
//   db.Post.find({
//     title: { $regex: new RegExp(req.query.q, 'i')}
//   })
//     .then(posts => res.json(posts))
//     .catch(err => res.status(422).send(err));
// });


module.exports = router;
