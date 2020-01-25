const mongoose = require("mongoose");
var loginschema = new mongoose.Schema({
  user_id: String,
  password: String
});
var login = mongoose.model("login", loginschema);

module.exports = login;