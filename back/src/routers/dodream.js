const express = require("express");
const router = express.Router();

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Walk" });
});

router.get("/select", function (req, res) {
  maria.query("SELECT * FROM WALK", function (err, rows, fields) {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
