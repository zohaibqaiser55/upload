//I have used the code avaliable on CCT MOODEL [by : Mikhail Timofeev]
//Angular & NodeJS - The MEAN Stack Guide [online Courese on Udemy]
//link to that Course is [https://www.udemy.com/share/101WISB0QZclxTR34=/]
//This project is submitted by: Zohaib Qaiser[2017400]

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

//importing the Books file functionality from routes folder which have all the routes
const booksRoutes = require("./routes/books")
//making an instance that will connect the app.js with controller file
const BookController = require("./controllers/review");

//instense of express()
const app = express();


//connecting to Data Base while the credentials of the data base is hidden
 mongoose.connect(process.env.MONGO_URL )
  .then(() => {
    console.log('Online DataBase is Ready')
  })
  .catch(() =>{
   console.log('Error occured, During Connecting to DataBase. Pls check the database.js File' );
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use("/", express.static(path.join(__dirname, "angular")));

//to solve the issue of CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  //jumping to next fuction//route
  next();
});

//calling/ using the routes file
//also filtering that any requeat with path /api/book will be able to get access to the routing file 
app.use("/api/book",booksRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
