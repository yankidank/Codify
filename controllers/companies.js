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
	response.send(companies);
});

// gets one company by company ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const company = await Company.findById(id);

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
	let newCompanyInfo = dropUndefined({ displayName, logoUrl, location, description, notes });
	try {
		let newCompany = await Company.create(newCompanyInfo);

		res.json(newCompany);
	} catch (err) {
    console.error(err);
		let filter = buildFilter({ displayName });
		let duplicateCompany = await Company.find(filter.length ? { $or: filter } : {});

		if (duplicateCompany) {
			res.status(409).json(duplicateCompany);
		} else {
			res.status(500).send({ error: "Something went wrong; we're on it!" });
		}
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { displayName, logoUrl, location, description, notes } = req.body;
	let fieldsToUpdate = dropUndefined({ displayName, logoUrl, location, description, notes });

	let updatedCompany = await Company.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

	if (!updatedCompany) res.status(404).send({ error: 'Company not found!' });
	else res.json(updatedCompany);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	let deletedCompany = await Company.findByIdAndRemove(id);
	if (!deletedCompany) res.status(404).send({ error: 'Company not found!' });
	else res.json(deletedCompany);
});

module.exports = router;
