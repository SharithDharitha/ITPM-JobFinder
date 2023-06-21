const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  applicantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "Applicant",
  },

  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  reply: {
    type: String,
    required: false,
  },
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;
