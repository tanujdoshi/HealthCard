const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const chemist = require("./schemas/chemist");
const lab = require("./schemas/lab");
const login = require("./schemas/login");
const doctor = require("./schemas//doctor");
const user = require("./schemas/user");
// const nJwt = require("njwt");
// const keys = require("./keyConfig");

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
  // console.log(req.params);
  var { fname, lname, userType, dob } = req.params;
  var startPart = userType.charAt(0) + fname.substring(0, 2) + lname.charAt(0);
  var endPart =
    dob.substring(dob.length - 2, dob.length) +
    dob.substring(dob.length - 5, dob.length - 3);

  console.log("dob", new Date(dob));
  user
    .findOne({
      userId: {
        $regex: new RegExp("^" + userType.charAt(0).toUpperCase() + ".")
      },
      firstname: { $regex: new RegExp("^" + fname + "$", "i") },
      lastname: { $regex: new RegExp("^" + lname + "$", "i") },
      dob: new Date(dob)
    })
    .sort({ _id: -1 })
    .then(r => {
      console.log(r);
      var middelPart = "not defined";
      console.log("check:", r);
      if (r == null) {
        console.log("mp set to default");
        middelPart = "0000";
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
  var user = req.body.user;
  console.log(user);
  new login({
    uname: req.body.name,
    password: req.body.password,
    module: req.body.user
  }).save(function(err, data) {
    if (err) {
      console.log("Error");
    }
  });
  if (user == "medic") {
    new chemist({
      licence: req.body.licence,
      name: req.body.name,
      shop_name: req.body.shop_name,
      contact: req.body.contact,
      password: req.body.password,
      address: req.body.address
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
      licence: req.body.licence,
      name: req.body.name,
      shop_name: req.body.shop_name,
      contact: req.body.contact,
      password: req.body.password,
      address: req.body.address
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
        user
          .findOne({ userId: r.userId }, { userId: 0, _id: 0, __v: 0 })
          .then(user => {
            console.log(user);
            console.log("date:", user.dob);
            res.status(200).json({
              success: true,
              userType: r.module,
              userData: user
            });
          });
      }
    });
});
app.listen(8000, () => console.log("server is listening at 8000"));
