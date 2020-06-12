const { Router } = require('express');
const { Contact } = require('../models');
const { dropUndefined } = require('../utils/dropUndefined');
const { buildFilter } = require('../utils/queryHelper');

const router = Router();

// gets one contact by contact ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const contact = await Contact.findById(id);

		if (!contact) {
			res.status(404).send({ error: 'Contact not found!' });
		} else {
			res.json(contact);
		}
	} catch (err) {
		res.status(500).send({ error: "Something went wrong; we're on it!" });
	}
});

// gets all contacts associated with a user
router.get('/userid/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const contact = await Contact.find({ userId: id });
		if (contact.length == 0) {
			res.status(404).send({ error: 'No contacts found for user!' });
		} else {
			res.json(contact);
		}
	} catch (err) {
		res.status(500).send({ error: "Something went wrong; we're on it!" });
	}
});

router.post('/', async (req, res) => {
	const { userId, displayName, companyId, email, phone, position, notes } = req.body;
	let newContactInfo = dropUndefined({ userId, displayName, companyId, email, phone, position, notes });

	try {
		let newContact = await Contact.create(newContactInfo);

		res.json(newContact);
	} catch (err) {
		let filter = buildFilter({ email, phone });
		let duplicateContact = await Contact.find(filter.length ? { $or: filter } : {});

		if (duplicateContact) {
			res.status(409).json(duplicateContact);
		} else {
			res.status(500).send({ error: "Something went wrong; we're on it!" });
		}
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { displayName, email, phone, companyId, position, notes } = req.body;
	let fieldsToUpdate = dropUndefined({ displayName, email, phone, companyId, position, notes });

	let updatedContact = await Contact.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

	if (!updatedContact) res.status(404).send({ error: 'Contact not found!' });
	else res.json(updatedContact);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	let deletedContact = await Contact.findByIdAndRemove(id);
	if (!deletedContact) res.status(404).send({ error: 'Contact not found!' });
	else res.json(deletedContact);
});

module.exports = router;
