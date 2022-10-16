var express = require("express");
var router = express.Router();

const maria = require("../db/connect/maria");

router.get("/", async function (req, res) {
  const [rows] = await maria.execute("SELECT * FROM TRASHCAN");
  if (rows.length) {
    res.status(200).json(rows);
  } else {
    next(err);
  }
});

router.get("/count", async function (req, res) {
  const [rows] = await maria.execute("SELECT * FROM TRASHCOUNT");
  if (rows.length) {
    res.status(200).json(rows);
  } else {
    next(err);
  }
});

module.exports = router;
