const mongoose = require('mongoose')
const express = require('express')
const app = express()
const { Patient } = require("./models")
const { Login } = require("./models")
const bodyparser = require('body-parser')

mongoose.connect("mongodb://127.0.0.1:27017/HealthCard",{ useUnifiedTopology:true, useNewUrlParser: true,useCreateIndex:true })
.then(()=>console.log('Mongo Connected'))
.catch(err=>console.log("Mongo connection error",err))

app.use(bodyparser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,  PATCH, DELETE, OPTIONS');
    next();
})

app.post("/registerPatient",(req,res)=>{
    console.log(req.body)

    const {userName, password, name, bloodType, dob, cno, address } = req.body
    console.log('un',userName)
    Login.create({userName,password})
    .then((r)=>{
        console.log("login table",r)

        Patient.create({userId:r.userName, name, bloodType, contact:cno, dateofBirth:dob, address})
        .then(p=>{
            console.log("login:",r, "patient:",p);
            res.status(200).json({
                loginEntey:r,
                patientEntry:p
            })
        }).catch(err=>console.log('Patient entry not created'))
        
    }).catch(err=>console.log('login entry not created'))
})

app.listen(8000,()=>console.log("Server Listeing at 8000"))