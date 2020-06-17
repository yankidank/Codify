const { Router } = require('express');
const { Company } = require('../models');
const { buildFilter } = require('../utils/queryHelper');
const { dropUndefined } = require('../utils/dropUndefined');

const router = Router();

router.get('/', async (request, response) => {
	const {
		query: { displayName, description, createdAt, updatedAt }
	} = request;

	const filter = buildFilter({
		displayName,
		description,
		createdAt,
		updatedAt
	});

	const companies = await Company.find(filter.length ? { $and: filter } : {});
	console.log(companies);
	response.send(companies);
});

// gets one company by company ID
router.get('/:_id', async (req, res) => {
	const { _id } = req.params;
	try {
		const company = await Company.findById(_id);

		if (!company) {
			res.status(404).send({ error: 'Company not found!' });
		} else {
			res.json(company);
		}
	} catch (err) {
		res.status(500).send({ error: "Something went wrong; we're on it!" });
	}
});

router.post('/', async (req, res) => {
	const { displayName, logoUrl, location, description, notes } = req.body;
	let newContactInfo = dropUndefined({ displayName, logoUrl, location, description, notes });

	try {
		let newCompany = await Company.create(newContactInfo);

		res.json(newCompany);
	} catch (err) {
		let filter = buildFilter({ displayName });
		let duplicateCompany = await Company.find(filter.length ? { $or: filter } : {});

		if (duplicateCompany) {
			res.status(409).json(duplicateCompany);
		} else {
			res.status(500).send({ error: "Something went wrong; we're on it!" });
		}
	}
});

router.put('/:_id', async (req, res) => {
	const { _id } = req.params;
	const { displayName, logoUrl, location, description, notes } = req.body;
	let fieldsToUpdate = dropUndefined({ displayName, logoUrl, location, description, notes });

	let updatedCompany = await Company.findByIdAndUpdate(_id, fieldsToUpdate, { new: true });

	if (!updatedCompany) res.status(404).send({ error: 'Company not found!' });
	else res.json(updatedCompany);
});

router.delete('/:_id', async (req, res) => {
	const { _id } = req.params;
	let deletedCompany = await Company.findByIdAndRemove(_id);
	if (!deletedCompany) res.status(404).send({ error: 'Company not found!' });
	else res.json(deletedCompany);
});

module.exports = router;
