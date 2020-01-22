const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    userId:String,
    name:String,
    bloodType:String,
    contact:String,
    dateOfBirth:String,
    address:String
});
var PatientModel = mongoose.model("Patient",patientSchema);


var LoginSchema = new mongoose.Schema({
    userName:String,
    password:String
}) 
var loginModel = mongoose.model("Login",LoginSchema);

module.exports = { Patient:PatientModel, Login:loginModel } 