const { Router } = require('express');
const moment = require('moment');
const { User } = require('../models');

const router = Router();

router.get('/', async (request, response) => {
  const {
    params: {
      displayName,
      email,
      createdAt,
      updatedAt
    }
  } = request;

  const users = await User.find({
    $or: [
      { displayName: new RegExp(displayName) },
      { email: new RegExp(email) },
      { createdAt: moment(createdAt).startOf('day')},
      { updatedAt: moment(updatedAt).startOf('day')}
    ]
  });
  response.send(users);
})

router.get('/:id', async (request, response) => {
  const { id: _id } = request.params;
  const users = await User.find({ _id });
  console.log(users);
  response.send(users);
})


module.exports = router;