const mongoose = require("mongoose");
var userschemas = new mongoose.Schema({
  name: String,
  password: String,
  address: String,
  contact: String,
  dob: Date,
  blood: String,
  email: String
});
var user = mongoose.model("user", userschemas);

module.exports = user;
