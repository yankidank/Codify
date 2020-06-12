const mongoose = require("mongoose");
const { Company, Contact, User, Job } = require("../models");

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
      zip: 90025
    },
    description: 'His actual house',
    notes: 'Please call before you visit'
  }
]

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

const contactSeed = (userId, companyId) => [
  {
    userId,
    companyId,
    displayName: "some dude i dunno",
    email: 'some.dude@gmail.com',
    phone: '8888888888',
    position: 'the dude',
    notes: 'dude why'
  }
]

const jobSeed = (userId, companyId, contactIds) => [
  {
    userId,
    companyId,
    contactIds,
    name: 'Google Software Developer',
    interviews: [
      {
        date: new Date(),
        location: {
          remote: true,
          street: '12360 Landale St.',
          city: 'Studio City',
          state: 'CA',
          zip: 91604
        }
      }
    ],
    post: {
      date: new Date(),
      position: 'Junior Developer',
      city: 'Santa Monica',
      state: 'CA',
      salary: 80000,
      bonus: 10000,
      notes: 'Looks swanky'
    },
    offers: [
      {
          date: new Date(),
          startDate: new Date('2020-10-07'),
          salary: 80000,
          bonus: 10000,
          benefits: 'Transamerica Retirement Plan'
      }
    ],
    status: 'Saved'
  },
]

const seedUsers = async (userSeed) => {
  const users = await User.create(userSeed);
  const someGuy = await User.findOne({ displayName: 'some guy' });

  someGuy.comparePassword('some password', function (err, isMatch) {
    if (err) throw err;
    console.log('some password:', isMatch); // -> some password: true
  });
  someGuy.comparePassword('anything else', function (err, isMatch) {
    if (err) throw err;
    console.log('anything else:', isMatch); // -> anything else: false
  });
  console.log(`Added ${users.length} users`)
  return users;
}

const seedCompanies = async (companySeed) => {
  const companies = await Company.create(companySeed);
  console.log(`Added ${companies.length} companies`)
  return companies;
}

const seedContacts = async (contactSeed) => {
  const contacts = await Contact.create(contactSeed);
  console.log(`Added ${contacts.length} contacts`)
  return contacts;
}

const seedJobs = async (jobSeed) => {
  const jobs = await Job.create(jobSeed);
  console.log(`Added ${jobs.length} jobs`)
  return jobs;
}

const seedAll = async () => {
  try {
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Contact.deleteMany({}),
      Job.deleteMany({})
    ]);

    const users = await seedUsers(userSeed);
    const companies = await seedCompanies(companySeed);

    const someGuysId = users[0]._id;
    const someCompanyIds = [companies[0]._id];

    const contacts = await seedContacts(contactSeed(someGuysId, someCompanyIds));
    const someContactIds = [contacts[0]._id];

    await seedJobs(jobSeed(someGuysId, someCompanyIds[0], someContactIds));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAll();