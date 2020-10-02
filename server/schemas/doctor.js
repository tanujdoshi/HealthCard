const mongoose = require("mongoose");
var docSchema = new mongoose.Schema({
  licence: String,
  degree: String,
  workPlace: String,
  workPlaceAdd: String,
  workPlaceContact: String,
  speciaities: Array
});
var doctor = mongoose.model("doctor", docSchema);

module.exports = doctor;
