const mongoose = require('mongoose')
var chemistschema = new mongoose.Schema({
    licence:String ,
    name:String,
    shop_name:String,
    contact:String,
    password:String,
    address:String
   
});
var chemist = mongoose.model("chemist", chemistschema);

module.exports = chemist;