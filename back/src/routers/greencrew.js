const express = require("express");
const router = express.Router();
const { cpi } = require("../db/mongoDB/mongodb");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

router.get("/", async function (req, res, next) {
  // const asd = await cpi();
  // console.log(asd);
  await maria.query(
    `SELECT C.id, A.title, A.startAt, C.course, C.distance, C.leadTime, A.maxMember, C.level, (SELECT COUNT(*) FROM USERTOGREENCREW WHERE crewId = A.id) AS curMember, C.content, C.trafficInfo
  FROM GREENCREW AS A
  INNER JOIN ROUTE AS C
  ON A.routeId = C.id
  GROUP BY A.id`,
    async function (err, rows, fields) {
      for (i in rows) {
        const CPI = await cpi(rows[i].id);
        rows[i]["CPI"] = CPI[0]["test"];
      }
      res.status(200).json(rows);
    },
  );
});

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
