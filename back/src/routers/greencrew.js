const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

router.get("/", async function (req, res, next) {
  await maria.query(
    `SELECT A.title, A.startAt, C.course, C.distance, C.leadTime, A.maxMember, C.level, COUNT(DISTINCT B.userid) AS curMember, C.content, C.trafficInfo, JSON_ARRAYAGG(JSON_ARRAY(x,y)) as cpi
  FROM GREENCREW AS A
  INNER JOIN USERTOGREENCREW AS B
  ON A.id = B.crewId
  INNER JOIN (SELECT * FROM ROUTE INNER JOIN CPI ON ROUTE.id = CPI.routeId) AS C
  ON A.routeId = C.routeId
  GROUP BY A.id`,
    function (err, rows, fields) {
      res.status(200).json(rows);
    },
  );
});

// SELECT A.startAt, C.course, C.distance, C.leadTime, A.maxMember, C.level, SUM(B.userid) AS curMember, C.content, C.trafficInfo, C.x, C.y
//   FROM GREENCREW AS A
//   INNER JOIN USERTOGREENCREW AS B
//   ON A.id = B.crewId
//   INNER JOIN (SELECT * FROM ROUTE INNER JOIN CPI ON ROUTE.id = CPI.routeId) AS C
//   ON A.routeId = C.routeId

// // 모임 생성
// router.post("/", async function (req, res, next) {
//   const { course, category, area, date, maxMember } = req.body
// })

// 멤버 추가
router.post("/:crewId", login_required, async function (req, res, next) {
  const userId = req.currentUserId;
  const crewId = req.params.crewId;
  try {
    await maria.query(
      `SELECT maxMember, userId FROM GREENCREW INNER JOIN USERTOGREENCREW ON GREENCREW.crewId = USERTOGREENCREW.crewId WHERE GREENCREW.crewId = ?`,
      [crewId],
      async function (err, rows, fields) {
        if (!rows || rows.length < rows[0].maxMember) {
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
