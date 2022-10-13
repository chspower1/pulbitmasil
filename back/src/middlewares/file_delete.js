const fs = require("fs");
const path = require("path");
const maria = require("../db/connect/maria");

const fileDelete = reviewId => {
  maria.query(`SELECT reviewImg FROM REVIEW WHERE reviewId = ?`, [reviewId], async function (err, rows, fields) {
    if (!err) {
      const imgSrc = rows[0].reviewImg;
      const imgName = imgSrc.replace(hostURL, "");
      const imgPath = path.resolve(__dirname, "../../uploads", imgName);
      fs.unlinkSync(imgPath);
    } else {
      res.send(err);
    }
  });
};

module.exports = { fileDelete };
