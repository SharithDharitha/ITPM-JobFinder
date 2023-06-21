const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },

  _adminId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },

  tokenType: {
    type: String,
    enum: ["login", "resetPassword"],
  },
});

const AdminToken = mongoose.model("AdminToken", tokenSchema);
module.exports = { AdminToken };
