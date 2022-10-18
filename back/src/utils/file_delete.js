import fs from "fs";
import path from "path";
import maria from "../db/connect/maria";

const fileDelete = async reviewId => {
  const [rows] = await maria.query("SELECT reviewImg FROM REVIEW WHERE reviewId = ?", [reviewId]);

  const imgSrc = await rows[0].reviewImg;
  const imgName = await imgSrc.replace(hostURL, "");

  if (imgName !== "default.jpg") {
    const imgPath = path.resolve(__dirname, "../../uploads", imgName);
    fs.unlinkSync(imgPath);
    return;
  }
};

export { fileDelete };
