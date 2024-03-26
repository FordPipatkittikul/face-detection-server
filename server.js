const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex'); // database

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");


const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'at93sm456',
      database: 'smartbrain',
    },
});

require('dotenv').config();

const Pat = process.env.PAT;
const UserID = process.env.USER_ID;


const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.text())




// app.get("/", (req,res) => {
//     res.send(database.users);
// })

app.post("/signin", (req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post("/register", (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get("/profile/:id",(req,res) => {profile.handleProfile(req,res,db)});

app.put("/image", (req,res) => {image.handleImage(req,res,db)});

app.post("/imagerecognition", (req,res) => {image.generalImageRecognitionAPI(req,res,Pat,UserID)});

app.post("/facedetection", (req,res) => {image.faceDetectionAPI(req,res,Pat,UserID)});

app.listen(3000, ()=>{
    console.log("app is running on port 3000")
});

