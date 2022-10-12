const express = require("express");
const router = express.Router();

const dodream = require("../db/mongoDB/DoDream");

/* GET home page. */
router.get("/", function (req, res, next) {
  dodream()
    .then(result => res.status(200).json(result))
    .catch(console.error)
    .finally(() => 
    // console.log("Done.")
    );
});

module.exports = router;
