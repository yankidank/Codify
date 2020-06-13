const { Router } = require('express');
const { Job } = require('../models');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

router.get('/', async (request, response) => {
  const { query } = request;

  const filter = buildFilter(query);

  const jobs = await Job.find(filter.length ? { $and: filter } : {})
    .populate('company')
    .populate('contacts');

  response.send(jobs);
});

router.get('/:id', async (request, response) => {
  const {
    params: { id },
  } = request;

  const job = await Job.findById(id).populate('company').populate('contacts');

  if (!job) {
    response.status(404).send({ error: 'User not found!' });
  }
  response.send(job);
});

module.exports = router;
