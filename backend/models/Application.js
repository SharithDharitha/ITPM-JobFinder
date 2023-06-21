const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
jobTitle: {
    type: String,
    required: true,
  },
 jobId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applicantId: {
    type: String,
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: false,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application ;
