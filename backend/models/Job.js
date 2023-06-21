const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  companyId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobDuration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job ;
