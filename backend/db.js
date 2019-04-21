const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'login_days_packages'
});

db.connect((err) => {
  if(err)
    throw err;
  console.log('connected to mysql')
});

module.exports = db;
