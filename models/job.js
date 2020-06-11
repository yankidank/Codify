const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true,
        index: {unique: true}
    },
    name: {
        type: String,
        required: true
    },
    companyId: mongoose.ObjectId,
    interviews: [
        {
            date: Date,
            location: {
                remote: Boolean,
                Street: String,
                City: String,
                State: String
            },
            notes: String
        }
    ], 
    post: {
        date: Date,
        position: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        salary: Number,
        bonus: Number,
        notes: String
    },
    offers: [
        {
            date: Date,
            startDate: Date,
            salary: Number,
            bonus: Number,
            benefits: String
        }
    ],
    status: String,
    statusHistory: [
        {
            status: String,
            date: Date
        }
    ]
}, {timestamps: true});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
