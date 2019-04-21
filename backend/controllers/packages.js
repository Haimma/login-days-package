const db = require('../db');

exports.addPackages = (req, res) => {
  let package = {
    userId: req.userData.userId,
    width: req.body.width,
    height: req.body.height,
    length: req.body.length,
    weight: req.body.weight,
    rate: req.body.width * req.body.height + req.body.length / req.body.weight
  };
  let sql = 'INSERT INTO packages SET ?';
  let query = db.query(sql, package, (err, result) => {
      if(err) throw err;
  });
}

exports.getPackages = (req, res) => {
  let sql = 'SELECT * FROM packages WHERE userId=?';
  let query = db.query(sql, req.userData.userId, (err, result) => {
      if(err) throw err;
      res.status(200).json(result);
  });
}
