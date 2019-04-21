const db = require('../db');

exports.addBD = (req, res) => {
  const sDate = new Date(req.body.startDate);
  const eDate = new Date(req.body.endDate);
  let businessDay = {userId: req.userData.userId, startDate: formatDate(sDate), endDate: formatDate(eDate), businessDays: (eDate - sDate)/86400000};
  let sql = 'INSERT INTO businessdays SET ?';
  let query = db.query(sql, businessDay, (err, result) => {
      if(err) throw err;

  });
}

exports.getBD = (req, res) => {
  let sql = 'SELECT * FROM businessDays WHERE userId=?';
  let query = db.query(sql, req.userData.userId, (err, result) => {
      if(err) throw err;
      res.status(200).json(result);
  });
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}
