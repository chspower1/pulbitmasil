const express = require("express");
const router = express.Router();

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "User" });
});

router.get("/create", async function (req, res) {
  maria.query(
    `CREATE TABLE USER (
    id VARCHAR(20) primary key,
    email VARCHAR(30),
    name VARCHAR(10),
    hasedPassword VARCHAR(10))`,
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
  maria.query('INSERT INTO USER(DEPART_CODE, NAME) VALUES(5001, "ENGLISH")', function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
