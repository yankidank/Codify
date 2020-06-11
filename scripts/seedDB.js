const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/presume",
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
  }
);

const userSeed = new db.User({
  displayName: 'some guy',
  email: 'some.guy@gmail.com',
  password: 'some password'
})

db.User.deleteMany({})
  .then(() => {
    return userSeed.save(err => {
      if (err) throw err;

      db.User.findOne({ displayName: 'some guy' }, function (err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('some password', function (err, isMatch) {
          if (err) throw err;
          console.log('some password:', isMatch); // -> some password: true
        });

        // test a failing password
        user.comparePassword('anything else', function (err, isMatch) {
          if (err) throw err;
          console.log('anything else:', isMatch); // -> anything else: false
        });

        process.exit(0);

      });
    });
  })

// db.Post.remove({})
//   .then(() => db.Post.collection.insertMany(postSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
