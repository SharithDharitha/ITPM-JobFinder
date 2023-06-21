const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
    token: {
      type: String,
      required: true,
    },
  
    _companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
  
    tokenType: {
      type: String,
      enum: ["login", "resetPassword"],
    },
  });
  
  const CompanyToken = mongoose.model("CompanyToken", tokenSchema);
  module.exports = { CompanyToken };