const router = require("express").Router();
const db = require("../models");

//this route can be used to check authentication status on the front end
router.get("/getUserInfo", (req, res)=> {
  res.json({
    user: req.user
  })
})


router.get("/posts", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Post.find({
    title: { $regex: new RegExp(req.query.q, 'i')}
  })
    .then(posts => res.json(posts))
    .catch(err => res.status(422).send(err));
});


module.exports = router;
