const express = require('express');
const bodyParser = require('body-parser');

const loginRoute = require('./routes/login');
const packagesRoute = require('./routes/packages');
const businessDaysRoute = require('./routes/businessDays');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  //for the cors
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
}); // midleware

app.use("/api/Auth", loginRoute);
app.use("/api/Packages", packagesRoute);
app.use("/api/BusinessDays", businessDaysRoute);

module.exports = app;
