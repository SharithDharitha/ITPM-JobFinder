const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },

  _applicantId: {
    type: Schema.Types.ObjectId,
    ref: "Applicant",
  },

  tokenType: {
    type: String,
    enum: ["login", "resetPassword"],
  },
});

const ApplicantToken = mongoose.model("ApplicantToken", tokenSchema);
module.exports = { ApplicantToken };
