const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			required: true
		},
		displayName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			sparse: true
		},
		phone: {
			type: Number,
			unique: true,
			sparse: true
		},
		companyId: [mongoose.ObjectId],
		position: String,
		notes: String
	},
	{ timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
