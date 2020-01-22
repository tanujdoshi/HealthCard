const mongoose = require('mongoose')
var loginschema = new mongoose.Schema({
    uname:String ,
    password:String,
    module:String,
    
});
var login = mongoose.model("login", loginschema);

module.exports = login;