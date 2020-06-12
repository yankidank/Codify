const mongoose = require("mongoose");
const { Company, User } = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/presume",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const companySeed = [
  {
    displayName: 'Noah Miller\'s House',
    location: {
      street: '1409 S Saltair Ave. APT 303',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90025'
    },
    description: 'His actual house',
    notes: 'Please call before you visit'
  }
]

Company.deleteMany({})
  .then(async () => {
    try {
      const companies = await Company.create(companySeed);
      console.log(companies);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })


const userSeed = [
  {
    displayName: 'some guy',
    email: 'some.guy@gmail.com',
    password: 'some password'
  },
  {
    displayName: 'some other guy',
    email: 'some.other.guy@gmail.com',
    password: 'some password'
  }
]

User.deleteMany({})
  .then(async () => {
    try {
      const users = await User.create(userSeed);
      console.log(users);
      const someGuy = await User.findOne({ displayName: 'some guy' });

      someGuy.comparePassword('some password', function (err, isMatch) {
        if (err) throw err;
        console.log('some password:', isMatch); // -> some password: true
      });
      someGuy.comparePassword('anything else', function (err, isMatch) {
        if (err) throw err;
        console.log('anything else:', isMatch); // -> anything else: false
      });

      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

