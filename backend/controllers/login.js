const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../db');

exports.creatUser = (req,res) => {
  //check if the email already used//
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const newUser = {email: req.body.email, password: hash};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, newUser, (err, result) => {
      if(err) throw err;
    });
  });
}

exports.loginUser = (req,res) => {
  let sql = 'SELECT * FROM users WHERE email=?';
  db.query(sql, req.body.email, (err, result) => {
    if(err)
      throw err;
    if(result.length === 0){
      return res.status(401).json({
      message: "email not found"
      })
    }
    const userId = result[0].userId;
    const email = result[0].email;
    bcrypt.compare(req.body.password, result[0].password)
    .then(comparePass => {
      if (comparePass){
        const token = jwt.sign(
          {email: email, userId: userId},
          "secret_this_should_be_loneger_login-days-package",
          {expiresIn: '1h'}
          );
        res.status(200).json({
          token,
          userId,
          expiresIn: 3600
        });
      }
      else {
        return res.status(401).json({
        message: "email not found"
        })
      }
    });
  });
}
