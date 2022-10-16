var express = require("express");
var router = express.Router();

const maria = require("../db/connect/maria");

router.get("/", function (req, res) {
  maria.query("SELECT * FROM TRASHCAN", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      // console.log("err : " + err);
      res.send(err);
    }
  });
});

router.get("/count", function (req, res) {
  maria.query("SELECT * FROM TRASHCOUNT", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      // console.log("err : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
