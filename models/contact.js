const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
      index: { unique: true },
    },
    displayName: {
      type: String,
      required: true,
    },
    companyId: [mongoose.ObjectId],
    email: String,
    phone: Number,
    position: String,
    notes: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
