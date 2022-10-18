const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login_required = require("../middlewares/login_required");
const maria = require("../db/connect/maria");
const random_password = require("../middlewares/random_password");
const emailForTempPassword = require("../utils/email");
const Mail = require("nodemailer/lib/mailer");

// router.get("/select", async function (req, res) {
//   try {
//     const [rows, fields] = await maria.execute("SELECT * FROM USER");
//     res.send(rows);
//   } catch (err) {
//     res.send(err);
//   }
// });

// 회원가입
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await maria.execute(
      `INSERT INTO USER(name, email, hashedPassword, social) VALUES(?,?,?, "origin")`,
      [name, email, hashedPassword],
    );

    res.status(201).json({ success: true, id: rows.insertId, social: "origin" });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const [rows] = await maria.execute(
      `SELECT A.id, A.email, A.name, A.social, A.hashedPassword, B.reviewId, C.crewId
                FROM USER AS A
                LEFT JOIN REVIEW AS B
                ON A.id = B.userId
                LEFT JOIN USERTOGREENCREW AS C
                ON A.id = C.userId
                WHERE A.email = ?`,
      [email],
    );

    if (rows.length) {
      const correctPasswordHash = rows[0].hashedPassword;
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
      if (!isPasswordCorrect) {
        return res.sendStatus(401);
      }

      const [review] = await maria.execute(
        `SELECT RV.reviewId, GC.title, RV.description, RV.createAt, GC.inProgress
        FROM REVIEW AS RV
        LEFT JOIN GREENCREW AS GC ON GC.crewId = RV.crewId
        WHERE RV.userId = ?`,
        [rows[0].id],
      );

      const [greenCrew] = await maria.execute(
        `SELECT GC.crewId, GC.title, GC.startAt, RT.course, RT.area, GC.inProgress
        FROM USERTOGREENCREW AS UTGC
        LEFT JOIN GREENCREW AS GC ON GC.crewId = UTGC.crewid
        LEFT JOIN ROUTE AS RT ON RT.id = GC.routeId
        WHERE UTGC.userId = ?`,
        [rows[0].id],
      );

      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: rows[0].id }, secretKey);
      res.status(200).json({
        success: true,
        email: email,
        id: rows[0].id,
        token: token,
        name: rows[0].name,
        social: rows[0].social,
        reviews: review,
        greenCrews: greenCrew,
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/delete", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    const [rows] = await maria.execute(`DELETE FROM USER WHERE id = ?`, [user_id]);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.put("/name", login_required, async function (req, res, next) {
  try {
    const name = req.body?.name || null;

    const userId = req.currentUserId;

    const [rows] = await maria.execute(`UPDATE USER SET name = ? WHERE id = ?`, [name, userId]);
    if (!rows.affectedRows) {
      return res.sendStatus(404);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.put("/password", login_required, async function (req, res, next) {
  try {
    const { password, newPassword } = req.body;
    const userId = req.currentUserId;

    const [rows] = await maria.execute("SELECT hashedPassword FROM USER WHERE id = ?", [userId]);
    const isPasswordCorrect = await bcrypt.compare(password, rows[0].hashedPassword);
    if (!isPasswordCorrect) {
      return res.sendStatus(406);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [rows2] = await maria.execute(`UPDATE USER SET hashedPassword = ? WHERE id = ?`, [hashedPassword, userId]);
    if (!rows2.affectedRows) {
      return res.sendStatus(404);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.put("/reset", random_password, async function (req, res, next) {
  try {
    const email = req.body.email;
    const tempPassword = req.randPwd;

    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const [rows] = await maria.execute(
      `UPDATE USER SET hashedPassword = ? WHERE email = ? AND hashedPassword NOT IN ("kakao", "naver")`,
      [hashedPassword, email],
    );

    if (!rows.affectedRows) {
      return res.sendStatus(402);
    }

    await emailForTempPassword(email, tempPassword);
    res.status(205).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/mypage", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    const [rows] = await maria.execute(`SELECT id, name, email, img, social FROM USER WHERE id = ?`, [user_id]);

    const [review] = await maria.execute(
      `SELECT RV.reviewId, GC.title, RV.description, RV.createAt, GC.inProgress
        FROM REVIEW AS RV
        LEFT JOIN GREENCREW AS GC ON GC.crewId = RV.crewId
        WHERE RV.userId = ?`,
      [user_id],
    );

    const [greenCrew] = await maria.execute(
      `SELECT GC.crewId, GC.title, GC.startAt, RT.course, RT.area, GC.inProgress
        FROM USERTOGREENCREW AS UTGC
        LEFT JOIN GREENCREW AS GC ON GC.crewId = UTGC.crewid
        LEFT JOIN ROUTE AS RT ON RT.id = GC.routeId
        WHERE UTGC.userId = ?`,
      [user_id],
    );

    res.status(200).json({
      email: rows[0].email,
      id: rows[0].id,
      name: rows[0].name,
      social: rows[0].social,
      reviews: review,
      greenCrews: greenCrew,
    });
  } catch (error) {
    next(error);
  }
});

// modify 전, 비밀번호 체크
// router.post("/verify", login_required, async function (req, res, next) {
//   try {
//     const user_id = req.currentUserId;
//     const { password } = req.body;

//     maria.query(`SELECT hashedPassword FROM USER WHERE id = ?`, [user_id], async function (err, rows, fields) {
//       if (!err) {
//         const correctPasswordHash = rows[0].hashedPassword;
//         const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
//         if (!isPasswordCorrect) {
//           return res.json({ success: false });
//         }
//         res.json({ success: true });
//       } else {
//         console.log("err : " + err);
//         res.send(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
