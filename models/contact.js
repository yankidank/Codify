const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User'
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    company: [{
      type: mongoose.ObjectId,
      ref: 'Company'
    }],
    position: String,
    notes: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
