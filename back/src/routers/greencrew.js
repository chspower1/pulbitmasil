const express = require("express");
const router = express.Router();
const { cpi } = require("../db/mongoDB/mongodb");
const login_required = require("../middlewares/login_required");
const maria = require("../db/connect/maria");

router.get("/", async function (req, res, next) {
  try {
    const [rows] = await maria.execute(
      `SELECT 
      A.crewId,
      A.title,
      A.startAt,
      A.maxMember,
      ( SELECT COUNT(*) FROM USERTOGREENCREW WHERE crewId = A.crewId ) AS curMember,
      B.id,
      B.course,
      B.distance,
      B.leadTime,
      B.level, 
      B.content,
      B.trafficInfo
      FROM GREENCREW AS A
      INNER JOIN ROUTE AS B
      ON A.routeId = B.id
      WHERE A.inProgress = 1
      GROUP BY A.crewId`,
    );

    if (rows.length) {
      for (i in rows) {
        const CPI = await cpi(rows[i].id);
        rows[i]["CPI"] = CPI[0]["test"];
      }
      res.status(200).json(rows);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/summary", async function (req, res, next) {
  try {
    const [rows] = await maria.execute(
      `SELECT 
      A.title,
      A.startAt,
      B.area,
      B.course
      FROM GREENCREW AS A
      INNER JOIN ROUTE AS B
      ON A.routeId = B.id
      WHERE A.inProgress = 1
      GROUP BY A.crewId`,
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

router.get("/:crewId", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const crewId = req.params.crewId;

    const [rows] = await maria.execute(
      `SELECT maxMember, userId 
                  FROM GREENCREW
                  LEFT JOIN USERTOGREENCREW
                  ON GREENCREW.crewId = USERTOGREENCREW.crewId
                  WHERE GREENCREW.crewId = ?`,
      [crewId],
    );
    if (rows.length < rows[0].maxMember) {
      const [rows2] = await maria.execute(`INSERT INTO USERTOGREENCREW(userId, crewId) VALUES(?, ?)`, [
        userId,
        parseInt(crewId),
      ]);

      res.status(200).json(rows2);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.delete("/:crewId", login_required, async function (req, res, next) {
  try {
    const crewId = req.params.crewId;
    const userId = req.currentUserId;

    const [rows] = await maria.execute(`DELETE FROM USERTOGREENCREW WHERE userId = ? AND crewId = ?`, [userId, crewId]);
    if (rows.affectedRows) {
      res.status(200).json({ success: true });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
