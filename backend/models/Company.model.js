const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
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

  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  permissionLevel: {
    type: String,
    required: true,
    default: "COMPANY",
  },
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = { Company };
