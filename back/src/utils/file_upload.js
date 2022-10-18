import multer from "multer";
import path from "path";

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

export { upload };
