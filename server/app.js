var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var cookieParser = require("cookie-parser");
var chemist = require("./schemas/chemist");
var lab = require("./schemas/lab");
var login = require("./schemas/login");
var doctor = require("./schemas//doctor");
var labtest = require("./schemas/labtest");
const user = require("./schemas/user");
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

mongoose
  .connect("mongodb://localhost:27017/HealthCard", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log("Mongo connection error ", err));

app.get("/getUserId/:fname/:lname/:userType/:dob", (req, res) => {
  console.log(req.params);
  var { fname, lname, userType, dob } = req.params;
  var startPart = userType.charAt(0) + fname.substring(0, 2) + lname.charAt(0);
  var endPart =
    dob.substring(dob.length - 2, dob.length) +
    dob.substring(dob.length - 5, dob.length - 3);

  user
    .findOne({
      firstname: { $regex: new RegExp("^" + fname + "$", "i") },
      lastname: { $regex: new RegExp("^" + lname + "$", "i") }
    })
    .sort({ _id: -1 })
    .then(r => {
      var middelPart = "not defined";
      console.log("check:", r);
      if (r == null) {
        console.log("mp set to default");
        middelPart = "AA00";
        console.log("mp:", middelPart);
      } else {
        console.log("mp other");

        //get starting of middel in HEX
        var m1 = r.userId.substring(4, 6);
        console.log("m1:", m1);
        var m2 = parseInt(r.userId.substring(6, 8)) + 1;
        console.log("m2:", m2);
        if (m2 >= 100) {
          console.log("reset");
          m2 = 0;
          m1 = parseInt(m1, 16) + 1;
          m1 = m1.toString(16);
        }
        if (m2 < 10) {
          m2 = "0" + m2;
        }
        console.log("mp other");
        middelPart = m1 + m2;
        console.log("mp other", middelPart);
      }
      id = (startPart + middelPart + endPart).toUpperCase();

      console.log("getId:", id);
      res.status(200).json({
        userId: id
      });
    });
});

app.post("/registeruser", async (req, res) => {
  var { fname, lname, dob } = req.body;
  var userType = req.body.user;
  console.log(fname, lname, userType, dob);
  var id = "not defined";
  login
    .create({
      email: req.body.email,
      password: req.body.password,
      module: req.body.user,
      userId: req.body.userId
    })
    .then(r => {
      console.log("r:", r);
      user
        .create({
          userId: req.body.userId,
          firstname: req.body.fname,
          lastname: req.body.lname,
          address: req.body.address,
          contact: req.body.contact,
          dob: req.body.dob,
          blood: req.body.blood,
          email: req.body.email,
          userType: req.body.userType
        })
        .then(u => {
          res.status(200).json({
            success: true,
            user: u
          });
        })
        .catch(err => {
          console.log("user error", err);
        });
    })
    .catch(err => {
      console.log("login err:", err);
    });
  // });
});
app.post("/register", async (req, res) => {
  console.log("Inside post register app.js");
  var usertype = req.body.user;
  new login({
    email: req.body.email,
    password: req.body.password,
    module: req.body.user,
    userId: req.body.userId
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });

  new user({
    userId: req.body.userId,
    firstname: req.body.fname,
    lastname: req.body.lname,
    address: req.body.address,
    contact: req.body.contact,
    dob: req.body.dob,
    blood: req.body.blood,
    email: req.body.email,
    userType: req.body.userType
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });


  //lab insertion
  if (usertype == "lab") {
    console.log("inside lab")
    var selecteditems=req.body.selectedItems
  
  selecteditems.forEach(x => {
    //console.log(x.item_text)
    //insert lab tests
    new labtest({
      userId:req.body.userid,
      test:x.item_text
    }).save(function(err,data){
    if(err){
      console.log(err)
    }
  })
})

//new lab
   new lab({
      userId:req.body.userId,
      licence: req.body.licence,
      labname: req.body.labname,
      DOE:req.body.DOE,
      address:req.body.lab_address
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

  })

  

app.post("/registermedic",(req,res) => {

  var usertype = req.body.user;
  new login({
    email: req.body.email,
    password: req.body.password,
    module: req.body.user,
    userId: req.body.userId
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });

  new user({
    userId: req.body.userId,
    firstname: req.body.fname,
    lastname: req.body.lname,
    address: req.body.address,
    contact: req.body.contact,
    dob: req.body.dob,
    blood: req.body.blood,
    email: req.body.email,
    userType: req.body.userType
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });


  //lab insertion

   new chemist({
      userId:req.body.userId,
      licence: req.body.licence,
      shopname: req.body.labname,
      DOE:req.body.DOE,
      address:req.body.shop_address
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




})
app.post("/login", (req, res) => {
  console.log("req body", req.body);
  login
    .findOne(
      {
        email: req.body.uname,
        password: req.body.password
      },
      {
        password: 0
      }
    )
    .then(r => {
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