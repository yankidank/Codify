const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User'
    },
    company: {
      type: mongoose.ObjectId,
      ref: 'Company'
    },
    contacts: [{
      type: mongoose.ObjectId,
      ref: 'Contact'
    }],
    interviews: [
      {
        date: Date,
        time: String,
        location: {
          remote: Boolean,
          street: String,
          city: String,
          state: String,
          zip: Number,
        },
        notes: String,
      },
    ],
    post: {
      url: String,
      date: Date,
      position: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      salary: Number,
      bonus: Number,
      responsibilities: String,
      requirements: String,
      benefits: String,
      notes: String,
    },
    offers: [
      {
        date: Date,
        startDate: Date,
        salary: Number,
        bonus: Number,
        benefits: String,
      },
    ],
    status: String,
    statusHistory: [
      {
        status: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

jobSchema.pre('save', function (next) {
  let job = this;

  if (!job.isModified('status')) return next();

  const status = { status: this.status, date: new Date() };

  job.statusHistory.push(status);
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
