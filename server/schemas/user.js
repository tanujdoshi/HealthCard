const mongoose = require("mongoose");
var userschemas = new mongoose.Schema({
  user_id: String,
  fname: String,
  lname: String,
  email: String,
  blood: String,
  dob: Date,
  contact: String,
  address: String,
  user_type: String
});
var user = mongoose.model("user", userschemas);

module.exports = user;