import { Router } from "express";
const greencrewRouter = Router();
import { getCpi } from "../db/mongoDB/mongodb";
import login_required from "../middlewares/login_required";
import maria from "../db/mariaDB/maria";

greencrewRouter.get("/", async function (req, res, next) {
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
      for (let i in rows) {
        const CPI = await getCpi(rows[i].id);
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

greencrewRouter.get("/summary", async function (req, res, next) {
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

greencrewRouter.get("/:crewId", login_required, async function (req, res, next) {
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
  }
});

greencrewRouter.delete("/:crewId", login_required, async function (req, res, next) {
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

export { greencrewRouter };
