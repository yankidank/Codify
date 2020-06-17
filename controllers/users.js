const { Router } = require('express');
const { User } = require('../models');
const { buildFilter } = require('../utils/queryHelper');
const { dropUndefined } = require('../utils/dropUndefined');

const router = Router();

router.get('/', async (request, response) => {
	const {
		query: { displayName, email, createdAt, updatedAt }
	} = request;

	const filter = buildFilter({ displayName, email, createdAt, updatedAt });

	const users = await User.find(filter.length ? { $and: filter } : {});

	response.send(users);
});

router.get('/:_id', async (request, response) => {
	const { _id } = request.params;
	const user = await User.findById(_id);

	if (!user) {
		response.status(404).send({ error: 'User not found!' });
	}

	response.send(user);
});

router.put('/:_id', async (request, response) => {
	const { _id } = request.params;
	const { displayName, email } = request.body;
  const updatedUserInfo = dropUndefined({ displayName, email });
  
	let updatedUser = await User.findByIdAndUpdate(_id, updatedUserInfo, { new: true });
	response.json(updatedUser);
});

router.delete('/:_id', async (request, response) => {
	const { _id } = request.params;
	const deleted = await User.findByIdAndDelete(_id);

	if (!deleted) {
		response.status(404).send({ error: 'User not found!' });
	}

	response.send({ deleted });
});

module.exports = router;
