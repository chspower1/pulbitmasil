const fs = require("fs");
const path = require("path");
const maria = require("../db/connect/maria");

const fileDelete = reviewId => {
  maria.query(`SELECT reviewImg FROM REVIEW WHERE reviewId = ?`, [reviewId], async function (err, rows, fields) {
    if (err) {
      return res.send(err);
    }

    const imgSrc = rows[0].reviewImg;
    const imgName = imgSrc.replace(hostURL, "");

    if (imgName !== "default.jpg") {
      const imgPath = path.resolve(__dirname, "../../uploads", imgName);
      fs.unlinkSync(imgPath);
    } else {
      return;
    }
  });
};

module.exports = { fileDelete };
