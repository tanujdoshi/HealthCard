var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var cookieParser = require("cookie-parser");

//var nodemailer = require('nodemailer');
//var rn = require('random-number');
//app.use(cookieParser());
app.use(bodyparser.json());
var options = {
  min: 1000,
  max: 9999,
  integer: true
};
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/HealthCard", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

var chemist = require("./schemas/chemist");
var lab = require("./schemas/lab");
var login = require("./schemas/login");
var user = require("./schemas/user");

app.post("/registeruser", async (req, res) => {
  new login({
    uname: req.body.name,
    password: req.body.password,
    module: req.body.user
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });
  new user({
    name: req.body.name,
    password: req.body.password,
    address: req.body.address,
    contact: req.body.contact,
    dob: req.body.dob,
    blood: req.body.blood,
    email: req.body.email
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });
});

var chemist = require("./schemas/chemist");
var lab = require("./schemas/lab");
var login = require("./schemas/login");
var doctor = require("./schemas//doctor");
var userschema = require("./schemas/user")

app.post("/register", async (req, res) => {
  console.log("Inside post register app.js");
  var user = req.body.user;
  console.log(user);
  new login({
    user_id: req.body.userid,
    password: req.body.password,
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });
  new userschema({
    user_id: req.body.userid,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    blood: req.body.blood,
    dob: req.body.dob,
    contact: req.body.contact,
    address: req.body.address,
    user_type: req.body.user
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });
  if (user == "medic") {
    new chemist({
      userid:req.body.userid,
      licence: req.body.licence,
      shopname: req.body.labname,
      DOE:req.body.DOE
    }).save(function(err, data) {
      if (err) {
        console.log("oh no");
        res.status(500).json({
          isSucceed: false
        });
      } else {
        console.log(data);
        console.log("love you baby");
        res.status(200).json({
          success: true
        });
      }
    });
  }
  if (user == "lab") {
    new lab({
      userid:req.body.userid,
      licence: req.body.licence,
      labname: req.body.labname,
      DOE:req.body.DOE
    }).save(function(err, data) {
      if (err) {
        console.log("oh no");
        res.status(500).json({
          isSucceed: false
        });
      } else {
        console.log(data);
        console.log("love you baby");
        res.status(200).json({
          success: true
        });
      }
    });
  }
  if (user == "doctor") {
    new doctor({
      licence: req.body.x,
      name: req.body.x,
      work_place: req.body.x,
      specialist: req.body.x,
      degree: req.body.x,
      work_place_add: req.body.x,
      doc_address: req.body.x,
      work_place_contact: req.body.x,
      doc_contact: req.body.x
    }).save(function(err, data) {
      if (err) {
        console.log("Error in app.js register doctor");
        res.status(500).json({
          isSucceed: false
        });
      } else {
        console.log(data);
        console.log("Register Doctor Success");
        res.status(200).json({
          success: true
        });
      }
    });
  }
});
app.post("/login", (req, res) => {
  console.log("req body", req.body);
  var user = login
    .findOne(
      {
        uname: req.body.uname,
        password: req.body.password
      },
      {
        password: 0
      }
    )
    .then(r => {
      console.log("r:", r, " u:", user);
      if (r == null) {
        res.status(200).json({
          success: false
        });
      } else {
        res.status(200).json({
          success: true,
          userType: r.module
        });
      }
    });
});
app.listen(8000, () => console.log("server is listening at 8000"));
