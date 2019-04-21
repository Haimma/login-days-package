const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    ///////////////////step 2//////////////////////
    /////////////uncomment after step 1/////////////////////
    // database : 'login_days_packages'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();



///////////////////step 1//////////////////////
// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE login_days_packages';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            throw err;        
          } 
        console.log(result);
        res.send('Database created...');
    });
});


///////////////////step 3//////////////////////
// Create users table//
app.get('/createusersstable', (req, res) => {
  let sql = 'CREATE TABLE users(userId int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(userId))';
  db.query(sql, (err, result) => {
      if(err) {
        console.log(err);
        throw err;        
      } 
      console.log(result);
      res.send('users table created...');
  });
});

// Create days table//

app.get('/createdaysstable', (req, res) => {
  let sql = 'CREATE TABLE businessdays(userId int, startDate VARCHAR(80), endDate VARCHAR(80), businessDays int)';
  db.query(sql, (err, result) => {
    if(err) {
        console.log(err);
        throw err;        
      } 
      console.log(result);
      res.send('businessdays table created...');
  });
});

// Create packages table//

app.get('/createpackagesstable', (req, res) => {
  let sql = 'CREATE TABLE packages(userId int, width int, height int, length int, weight int, rate int)';
  db.query(sql, (err, result) => {
    if(err) {
        console.log(err);
        throw err;        
      } 
      console.log(result);
      res.send('packages table created...');
  });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});