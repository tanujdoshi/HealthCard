const mongoose = require("mongoose");
var docSchema = new mongoose.Schema({
  licence: String,
  eod: String,
  work_place: String,
  degree: String,
  work_place_add: String,
  work_place_contact: String,
  speciaities: JSON
});
var doctor = mongoose.model("doctor", docSchema);

module.exports = doctor;
