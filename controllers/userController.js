const { Router } = require('express');
const { User } = require('../models');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

router.get('/', async (request, response) => {
  const {
    query: {
      displayName,
      email,
      createdAt,
      updatedAt
    }
  } = request;

  const users = await User.find({
    $and: buildFilter({ displayName, email, createdAt, updatedAt })
  });
  response.send(users);
})

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const users = await User.findById(id);
  console.log(users);
  response.send(users);
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const result = await User.findByIdAndDelete(id);
  console.log(result);
  response.send(result);
})


module.exports = router;