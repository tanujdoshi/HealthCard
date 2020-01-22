const mongoose = require('mongoose')
var labSchema = new mongoose.Schema({
    licence:String ,
    name:String,
    shop_name:String,
    contact:String,
    password:String,
    address:String
   
});
var lab = mongoose.model("lab", labSchema);

module.exports = lab;