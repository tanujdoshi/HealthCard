const mongoose = require('mongoose')
var chemistschema = new mongoose.Schema({
    userid:String,
    licence: String,
    shopname: String,
    DOE:Date
   
});
var chemist = mongoose.model("chemist", chemistschema);

module.exports = chemist;