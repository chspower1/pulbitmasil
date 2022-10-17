const multer = require("multer");
const fs = require("fs");
const path = require("path");

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("uploads dir not exist");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const userId = req.currentUserId;
      const ext = path.extname(file.originalname);
      const newFileName = `greenCrew_${userId}_${Date.now()}${ext}`;
      done(null, newFileName);
    },
  }),
});

module.exports = { upload };
