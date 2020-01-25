const mongoose = require("mongoose");
var labSchema = new mongoose.Schema({
  userid:String,
  licence: String,
  labname: String,
  DOE:Date
});
var lab = mongoose.model("lab", labSchema);

module.exports = lab;
