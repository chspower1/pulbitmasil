const express = require("express");
const router = express.Router();
const login_required = require("../middlewares/login_required");
const maria = require("../db/connect/maria");

const { upload } = require("../middlewares/file_upload");
const { fileDelete } = require("../middlewares/file_delete");
const uploadSingle = upload.single("file");
require("dotenv").config();

global.hostURL = process.env.Upload;

router.get("/", async function (req, res, next) {
  try {
    const [rows] = await maria.execute(
      "SELECT reviewId, userId, description,createAt, name, reviewImg FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId",
    );

    if (rows.length) {
      res.send(rows);
    } else {
      throw new Error("failed to select");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:reviewId", async function (req, res, next) {
  try {
    const reviewId = req.params.reviewId;
    const [rows] = await maria.execute(
      "SELECT userId, description,createAt, name, reviewImg FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId where reviewId = ?",
      [reviewId],
    );

    if (rows.length) {
      res.send(rows);
    } else {
      throw new Error("failed to select");
    }
  } catch (error) {
    next(error);
  }
});

// 리뷰 작성
router.post("/create", login_required, uploadSingle, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { description, createAt } = req.body;

    if (!description || !createAt) {
      throw new Error("필수값이 없습니다.");
    }

    if (!description || !createAt) {
      throw new Error("필수값이 없습니다.");
    }

    let imgName;
    if (req.file) {
      imgName = hostURL + req.file.filename;
    } else {
      imgName = hostURL + "default.jpg";
    }

    const [rows] = await maria.execute("INSERT INTO REVIEW(userId, description, createAt, reviewImg) VALUES(?,?,?,?)", [
      userId,
      description,
      createAt,
      imgName,
    ]);

    if (rows.affectedRows) {
      res.status(200).json({
        success: true,
        description: description,
        createAt: createAt,
        userId: userId,
        reviewId: rows.insertId,
        reviewImg: imgName,
      });
    } else {
      throw new Error("failed to Insert");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:reviewId", login_required, uploadSingle, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const description = req.body.description ?? null;
    const reviewId = req.params.reviewId;
    let imgName = req.body.imageUrl ?? null;

    if (reviewer !== userId) {
      return res.sendStatus(432);
    }

    if (!imgName) {
      imgName = hostURL + req.file.filename;
      fileDelete(reviewId);
    }

    const [rows] = await maria.execute("UPDATE REVIEW SET  description = ?, reviewImg = ?  WHERE reviewId = ?", [
      description,
      imgName,
      reviewId,
    ]);

    if (rows.changedRows) {
      res.status(200).json({ success: true });
    } else {
      throw new Error("failed to update");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:reviewId", login_required, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    if (reviewer !== userId) {
      return res.sendStatus(432);
    }

    fileDelete(reviewId);

    const [rows] = await maria.execute("DELETE FROM REVIEW WHERE reviewId = ?", [reviewId]);

    if (rows.affectedRows) {
      res.status(200).json({ success: true });
    } else {
      throw new Error("failed to delete");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
