const mongoose = require("mongoose");
var labSchema = new mongoose.Schema({
  userId:String,
  licence: String,
  labname: String,
  DOE:Date,
  address:String
  licence: String,
  name: String,
  shop_name: String,
  contact: String,
  password: String,
  address: String
});
var lab = mongoose.model("lab", labSchema);

module.exports = lab;
