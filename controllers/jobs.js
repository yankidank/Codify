const { Router } = require('express');
const { Job } = require('../models');
const { buildFilter } = require('../utils/queryHelper');
const { dropUndefined } = require('../utils/dropUndefined');

const router = Router();

router.get('/', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    ...query,
    user: user._id,
  });

  const jobs = await Job.find(filter.length ? { $and: filter } : {user: user._id})
    .sort({ 'updatedAt': -1 })
    .populate('company')
    .populate('contacts');

  response.send(jobs);
});

router.get('/:_id', async (request, response) => {
  const {
    params: { _id },
    user,
  } = request;
  try {
    const job = await Job.findOne({ _id, user: user._id }).populate('company').populate('contacts');

    if (!job) response.status(404).send({ error: 'Job not found!' });

    if (!job.user || job.user.toString() !== user._id.toString())
      response.status(401).send({
        error: 'Not authorized! Are you sure this is a job you posted?',
      });
    else {
      response.send(job);
    }
  } catch (err) {
    console.log(err)
  }

});

router.post('/', async (request, response) => {
  const { body, user } = request;
  try {
    let newJob = await Job.create({ user: user._id, ...body });

    response.json(newJob);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error });
  }
});

router.put('/:_id', async (request, response) => {
  const {
    params: { _id },
    body: { extraQuery, set, unset, push, pull },
    user,
  } = request;
  let query = {_id, user: user._id};
  // to update interview/offer array
  if (extraQuery) {
    query["offers._id"] = extraQuery.offerId;
  }
  try {
    let updatedJob = await Job.findOneAndUpdate( query, dropUndefined({ $set: set, $unset: unset, $push: push, $pull: pull }), {new: true});
    if (!updatedJob) response.status(404).send({ error: 'Job not found!' });
    else {
      response.json(updatedJob);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error });
  }
});

router.delete('/:_id', async (request, response) => {
  const {
    params: { _id },
    user,
  } = request;

  try {
    const deleted = await Job.findOneAndRemove({ _id, user: user._id });
    console.log(deleted);

    if (!deleted) response.status(404).send({ error: 'Job not found!' });

    response.json(deleted);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error });
  }
});

module.exports = router;
