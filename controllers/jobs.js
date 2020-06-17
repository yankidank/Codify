const { Router } = require('express');
const puppeteer = require('puppeteer');
const { Job } = require('../models');
const { buildFilter } = require('../utils/queryHelper');
const { dropUndefined } = require('../utils/dropUndefined');

const router = Router();

router.get('/info', async (request, response) => {

  const {
    query: { url },
  } = request;

  if (!url) response.status(400).json({ error: 'Must include target url' });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // puppeteer runs this script on the DOM of the current page
  // Look through elements for content here
  const jobInfo = await page.evaluate(() => {
    const main = document.querySelector('[class*=core-rail]');
    const refs = [
      ...main.querySelector('[class*=title]'),
      ...main.querySelector('[class*=description]'),
      // ...document.querySelectorAll('p[class*=job]'),
    ];
    return refs.map(ref => ref && ref.textContent);
  });

  await browser.close();

  // console.log(jobInfo);
  response.send(jobInfo);
});

router.get('/', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    query,
    user: user._id,
  });

  const jobs = await Job.find(filter.length ? { $and: filter } : {})
    .populate('company')
    .populate('contacts');

  response.send(jobs);
});

router.get('/:_id', async (request, response) => {
  const {
    params: { _id },
    user,
  } = request;

  const job = await Job.findById(_id).populate('company').populate('contacts');

  if (!job) response.status(404).send({ error: 'Job not found!' });

  if (job.user._id !== user._id)
    response.status(401).send({
      error: 'Not authorized! Are you sure this is a job you posted?',
    });

  response.send(job);
});

router.get('/report', async (request, response) => {
  const { query, user } = request;

  const filter = buildFilter({
    query,
    user: user._id,
  });

  const jobs = await Job.find(filter.length ? { $and: filter } : {})
    .populate('company')
    .populate('contacts');

  response.send(jobs);
});

router.post('/', async (request, response) => {
  const {
    body: { post, company },
    user,
  } = request;
  try {
    let newJob = await Job.create({ user: user._id, company, post });

    response.json(newJob);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error });
  }
});

router.put('/:_id', async (request, response) => {
  const {
    params: { _id },
    body: { set, unset, push, pull },
    user,
  } = request;
  try {
    let updatedJob = await Job.findOneAndUpdate(
      {
        _id,
        user: user._id,
      },
      dropUndefined({ $set: set, $unset: unset, $push: push, $pull: pull })
    );

    console.log(updatedJob);

    if (!updatedJob) response.status(404).send({ error: 'Job not found!' });

    response.json(updatedJob);
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
