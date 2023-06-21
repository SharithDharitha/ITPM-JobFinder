const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  permissionLevel: {
    type: String,
    required: true,
    default: "APPLICANT",
  },
});

const Applicant = mongoose.model("Applicant", ApplicantSchema);
module.exports = { Applicant };
