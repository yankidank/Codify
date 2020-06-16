const { Router } = require('express');
const { Job } = require('../models');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

router.get('/', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    query,
    user: user._id
  });

  const jobs = await Job.find(filter.length ? { $and: filter } : {})
    .populate('company')
    .populate('contacts');

  response.send(jobs);
});

router.get('/:id', async (request, response) => {
  const {
    params: { id },
    user,
  } = request;

  const job = await Job.findById(id).populate('company').populate('contacts');

  if (!job)
    response.status(404).send({ error: 'Job not found!' });

  if (job.user._id !== user._id)
    response.status(401).send({ error: 'Not authorized! Are you sure this is a job you posted?' });

  response.send(job);
});

router.post('/', async (request, response) => {
  const { body, user } = request;

  try {
    let newJob = await Job.create({ user: user._id, body });

    response.json(newJob);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error });
  }
});

module.exports = router;
