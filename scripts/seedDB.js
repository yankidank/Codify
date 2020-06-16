const mongoose = require('mongoose');
const faker = require('faker');
const { Company, Contact, User, Job } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unicorn-hunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const companySeed = [
  {
    displayName: faker.company.companyName(),
    location: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: parseFloat(faker.address.zipCode().split('-')[0]),
    },
    description: faker.company.catchPhrase(),
    notes: faker.lorem.paragraph(),
  },
];

const userSeed = [
  {
    displayName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
];

const contactSeed = (user, company) => [
  {
    user,
    company,
    displayName: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber().match(/(\d+)/).join(''),
    position: faker.name.jobTitle(),
    notes: faker.name.jobDescriptor(),
  },
];

const jobSeed = (user, company, contacts) => [
  {
    user,
    company,
    contacts,
    name: faker.name.jobTitle(),
    interviews: [
      {
        date: new Date(),
        location: {
          remote: true,
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: parseFloat(faker.address.zipCode().split('-')[0]),
        },
      },
    ],
    post: {
      url: 'https://g.co/kgs/549a29',
      date: new Date(),
      position: faker.name.jobTitle(),
      city: faker.address.city(),
      state: faker.address.state(),
      salary: 80000,
      bonus: 10000,
      notes: faker.name.jobDescriptor(),
    },
    offers: [
      {
        date: new Date(),
        startDate: new Date('2020-10-07'),
        salary: 80000,
        bonus: 10000,
        benefits: 'Transamerica Retirement Plan',
      },
    ],
    status: 'Saved',
  },
];

const seedUsers = async userSeed => {
  const { password } = userSeed[0];
  const users = await User.create(userSeed);
  const someGuy = await User.findById(users[0]);

  someGuy.comparePassword(password, function (err, isMatch) {
    if (err) throw err;
    console.log('some password:', isMatch); // -> some password: true
  });
  someGuy.comparePassword('anything else', function (err, isMatch) {
    if (err) throw err;
    console.log('anything else:', isMatch); // -> anything else: false
  });
  console.log(`Added ${users.length} users`);
  return users;
};

const seedCompanies = async companySeed => {
  const companies = await Company.create(companySeed);
  console.log(`Added ${companies.length} companies`);
  return companies;
};

const seedContacts = async contactSeed => {
  const contacts = await Contact.create(contactSeed);
  console.log(`Added ${contacts.length} contacts`);
  return contacts;
};

const seedJobs = async jobSeed => {
  const jobs = await Job.create(jobSeed);
  console.log(`Added ${jobs.length} jobs`);
  return jobs;
};

const seedAll = async () => {
  try {
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Contact.deleteMany({}),
      Job.deleteMany({}),
    ]);

    const users = await seedUsers(userSeed);
    const companies = await seedCompanies(companySeed);

    const someGuysId = users[0]._id;
    const someCompanyIds = [companies[0]._id];

    const contacts = await seedContacts(
      contactSeed(someGuysId, someCompanyIds)
    );
    const someContactIds = [contacts[0]._id];

    await seedJobs(jobSeed(someGuysId, someCompanyIds[0], someContactIds));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAll();
