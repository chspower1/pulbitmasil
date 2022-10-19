import fs from "fs";
import path from "path";
import maria from "../db/mariaDB/maria";

const fileDelete = async reviewId => {
  const [rows] = await maria.query("SELECT reviewImg FROM REVIEW WHERE reviewId = ?", [reviewId]);

  const imgSrc = rows[0].reviewImg;
  const imgName = imgSrc.replace(hostURL, "");

  if (imgName !== "default.jpg") {
    const imgPath = path.resolve(__dirname, "../../uploads", imgName);
    fs.unlink(imgPath, function (err, data) {
      if (err) {
        next(err);
      }
    });
    return;
  }
};

export { fileDelete };
