import { Router } from "express";
const reviewRouter = Router();
import login_required from "../middlewares/login_required";
import maria from "../db/mariaDB/maria";
import { upload } from "../utils/file_upload";
import { fileDelete } from "../utils/file_delete";
const uploadSingle = upload.single("file");
require("dotenv").config();

global.hostURL = process.env.Upload;

reviewRouter.get("/", async function (req, res, next) {
  try {
    const [rows] = await maria.execute(
      `SELECT reviewId, userId, description,createAt, name, reviewImg, GC.title, RT.area
      FROM REVIEW
      LEFT JOIN USER ON USER.id = REVIEW.userId
      LEFT JOIN GREENCREW AS GC ON GC.crewId = REVIEW.crewId
      LEFT JOIN ROUTE AS RT ON RT.id = GC.routeId`,
    );

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:reviewId", async function (req, res, next) {
  try {
    const reviewId = req.params.reviewId;

    const [rows] = await maria.execute(
      `SELECT userId, description,createAt, name, reviewImg, GC.title
      FROM REVIEW
      LEFT JOIN USER ON USER.id = REVIEW.userId
      LEFT JOIN GREENCREW AS GC ON GC.crewId = REVIEW.crewId
      WHERE reviewId = ?`,
      [reviewId],
    );

    if (rows.length) {
      res.status(200).json(rows);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.post("/create", login_required, uploadSingle, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { description, createAt, title } = req.body;

    if (!description || !createAt || !title) {
      return res.sendStatus(405);
    }

    let imgName;
    if (req.file) {
      imgName = hostURL + req.file.filename;
    } else {
      imgName = hostURL + "default.jpg";
    }
    const [rows] = await maria.execute("SELECT crewId FROM GREENCREW WHERE title = ?", [title]);
    const [rows2] = await maria.execute(
      "INSERT INTO REVIEW(userId, description, createAt, reviewImg,crewId) VALUES(?,?,?,?,?)",
      [userId, description, createAt, imgName, rows[0].crewId],
    );

    if (rows2.affectedRows) {
      res.status(200).json({
        success: true,
        description: description,
        createAt: createAt,
        title: title,
        userId: userId,
        reviewId: rows2.insertId,
        reviewImg: imgName,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/:reviewId", login_required, uploadSingle, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const description = req.body.description ?? null;
    const reviewId = req.params.reviewId;
    const title = req.body.title ?? null;
    let imgName = req.body.imageUrl ?? null;

    if (reviewer !== userId) {
      return res.sendStatus(405);
    }

    if (!description) {
      return res.sendStatus(405);
    }

    if (!imgName) {
      imgName = hostURL + req.file.filename;
      fileDelete(reviewId);
    }

    const [crewId] = await maria.execute("SELECT crewId FROM GREENCREW WHERE title = ?", [title]);

    const [rows] = await maria.execute(
      "UPDATE REVIEW SET  description = ?, reviewImg = ?, crewId = ?  WHERE reviewId = ?",
      [description, imgName, crewId[0].crewId, reviewId],
    );

    if (rows.affectedRows) {
      res.status(200).json({ success: true });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/:reviewId", login_required, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    if (reviewer !== userId) {
      return res.sendStatus(405);
    }

    fileDelete(reviewId);

    const [rows] = await maria.execute("DELETE FROM REVIEW WHERE reviewId = ?", [reviewId]);

    if (rows.affectedRows) {
      res.status(200).json({ success: true });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
