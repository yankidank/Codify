const { Router } = require('express');
const { Company } = require('../models');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

router.get('/', async (request, response) => {

  const {
    query: {
      displayName,
      description,
      createdAt,
      updatedAt
    }
  } = request;

  const filter = buildFilter({ displayName, description, createdAt, updatedAt });

  const companies = await Company.find(filter.length ? { $and: filter } : {});

  response.send(companies);
});

module.exports = router;