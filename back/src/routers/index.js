var express = require("express");
var router = express.Router();

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create", function (req, res) {
  maria.query(
    `CREATE TABLE DEPARTMENT (
    DEPART_CODE INT(11),
    NAME VARCHAR(20))`,
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    },
  );
});

router.get("/insert", function (req, res) {
  maria.query('INSERT INTO DEPARTMENT(DEPART_CODE, NAME) VALUES(5001, "ENGLISH")', function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
