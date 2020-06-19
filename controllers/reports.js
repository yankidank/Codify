const { Router } = require('express');
const { Job } = require('../models');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

router.get('/status', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    query,
    user: user._id,
  });

  try {
    const jobs = await Job.aggregate([
      { $match: filter.length ? { $and: filter } : {} },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { _id: 0, status: '$_id', count: 1 } },
    ]);

    response.send(jobs);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
});

router.get('/communication', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    query,
    user: user._id,
  });

  try {
    const jobs = await Job.aggregate([
      { $match: filter.length ? { $and: filter } : {} },
      {
        $addFields: {
          contactCount: { $size: '$contacts' },
          interviewCount: { $size: '$interviews' },
        },
      },
    ]);
    
    const summary = jobs.reduce((accumulator, currentJob) => {
      const {contactCount, interviewCount} = currentJob;
      accumulator.totalContactCount += contactCount;
      accumulator.totalInterviewCount += interviewCount;
      return accumulator;
    }, {
      totalContactCount: 0, 
      totalInterviewCount: 0
    })

    response.send({ jobs, summary });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
});

module.exports = router;
