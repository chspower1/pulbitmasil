const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Review" });
// });

// router.get("/", function (req, res) {
//   maria.query(
//     "SELECT userId, description,createAt, name FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId",
//     function (err, rows, fields) {
//       if (!err) {
//         res.send(rows);
//         // console.log(rows);
//       } else {
//         // console.log("err : " + err);
//         res.send(err);
//       }
//     },
//   );
// });

// router.get("/:reviewId", function (req, res) {
//   const reviewId = req.params.reviewId;
//   maria.query(
//     "SELECT userId, description,createAt, name FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId where reviewId = ?",
//     [reviewId],
//     function (err, rows, fields) {
//       if (!err) {
//         res.send(rows);
//       } else {
//         // console.log("err : " + err);
//         res.send(err);
//       }
//     },
//   );
// });

// 멤버 추가
router.post("/:crewId", login_required, async function (req, res, next) {
  const userId = req.currentUserId;
  const crewId = req.params.crewId;
  try {
    await maria.query(
      `SELECT maxMember, userId FROM GREENCREW INNER JOIN USERTOGREENCREW ON GREENCREW.crewId = USERTOGREENCREW.crewId WHERE GREENCREW.crewId = ?`,
      [crewId],
      async function (err, rows, fields) {
        if (rows.length < rows[0].maxMember) {
          await maria.query(
            `INSERT INTO USERTOGREENCREW(userId, crewId) VALUES(?, ?)`,
            [userId, parseInt(crewId)],
            function (err, rows, fields) {
              res.status(200).json(rows);
            },
          );
        } else res.status(400).json({ success: false, message: "모임이 가득 찼습니다" });
      },
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:crewId", login_required, async function (req, res, next) {
  try {
    const crewId = req.params.crewId;
    const userId = req.currentUserId;

    await maria.query(
      `DELETE FROM USERTOGREENCREW WHERE userId = ? AND crewId = ?`,
      [userId, crewId],
      function (err, rows, fields) {
        if (!err) {
          res.status(200).json({ success: true });
        } else {
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
