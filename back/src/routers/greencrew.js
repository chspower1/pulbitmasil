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
                    C.id,
                    A.title,
                    A.startAt,
                    A.maxMember,
                    C.course,
                    C.distance,
                    C.leadTime,
                    C.level,
                    ( SELECT COUNT(*) FROM USERTOGREENCREW WHERE crewId = A.crewId ) AS curMember, 
                    C.content,
                    C.trafficInfo
                  FROM GREENCREW AS A
                  INNER JOIN ROUTE AS C
                  ON A.routeId = C.id
                  GROUP BY A.crewId`,
    );

    if (rows.length) {
      for (i in rows) {
        const CPI = await cpi(rows[i].id);
        rows[i]["CPI"] = CPI["test"];
      }
      res.status(200).json(rows);
    } else {
      throw new Error("failed to select");
    }
  } catch (error) {
    next(error);
  }
});

// 멤버 추가
router.post("/:crewId", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const crewId = req.params.crewId;

    const [rows] = await maria.execute(
      `SELECT maxMember, userId 
                  FROM GREENCREW
                  LEFT JOIN USERTOGREENCREW
                  ON GREENCREW.id = USERTOGREENCREW.crewId
                  WHERE GREENCREW.id = ?`,
      [crewId],
    );
    if (rows.length < rows[0].maxMember) {
      const [rows2] = await maria.execute(`INSERT INTO USERTOGREENCREW(userId, crewId) VALUES(?, ?)`, [
        userId,
        parseInt(crewId),
      ]);

      res.status(200).json(rows2);
    } else {
      throw new Error("Recruitment is complete");
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
      throw new Error("failed to delete");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
