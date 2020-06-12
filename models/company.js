const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    displayName: String,
    logoUrl: String,
    location: {
      street: String,
      city: String,
      state: String,
      zip: Number,
    },
    description: String,
    notes: String,
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
