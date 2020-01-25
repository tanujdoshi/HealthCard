const mongoose = require("mongoose");
var docSchema = new mongoose.Schema({
  licence: String,
  name: String,
  work_place: String,
  specialist: String,
  degree: String,
  work_place_add: String,
  doc_address: String,
  work_place_contact: String,
  doc_contact: String
});
var doctor = mongoose.model("doctor", docSchema);

module.exports = doctor;
