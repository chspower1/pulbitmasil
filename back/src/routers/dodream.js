const express = require("express");
const router = express.Router();

const { dodream } = require("../db/mongoDB/mongodb");

/* GET home page. */
router.get("/", function (req, res, next) {
  dodream()
    .then(result => res.status(200).json(result))
    .catch(console.error);
});

module.exports = router;
