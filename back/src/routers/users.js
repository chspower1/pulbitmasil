const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login_required = require("../middlewares/login_required");
const maria = require("../db/connect/maria");
const random_password = require("../middlewares/random_password");
const emailForTempPassword = require("../utils/email");

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

    res.status(200).json({ success: true, id: rows.insertId, social: "origin" });
  } catch (error) {
    next(error);
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
    const reviewId = [];
    const crewId = [];
    for (i in rows) {
      reviewId.push(rows[i].reviewId);
      crewId.push(rows[i].crewId);
    }
    const set1 = new Set(reviewId);
    const set2 = new Set(crewId);

    if (rows.length) {
      const correctPasswordHash = rows[0].hashedPassword;
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false });
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: rows[0].id }, secretKey);
      res.status(200).json({
        success: true,
        email: email,
        id: rows[0].id,
        token: token,
        name: rows[0].name,
        social: rows[0].social,
        reviewId: [...set1],
        crewId: [...set2],
      });
    } else {
      throw new Error("가입되지 않은 이메일입니다.");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/delete", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    const [rows] = await maria.execute(`DELETE FROM USER WHERE id = ?`, [user_id]);
    if (!rows.affectedRows) {
      throw new Error("이미 삭제된 계정입니다");
    }
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
      throw new Error("이름 수정 중 오류가 발생했습니다");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.put("/password", login_required, async function (req, res, next) {
  try {
    const password = req.body?.password || null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = req.currentUserId;

    const [rows] = await maria.execute(`UPDATE USER SET hashedPassword = ? WHERE id = ?`, [hashedPassword, userId]);
    if (!rows.affectedRows) {
      throw new Error("비밀번호 수정 중 오류가 발생했습니다");
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
      throw new Error("임시 비밀번호 발급에 실패했습니다");
    }

    await emailForTempPassword(email, tempPassword);
    res.status(200).json({ success: true });
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

// router.get("/mypage", login_required, function (req, res) {
//   const userId = req.currentUserId;
//   maria.query(
//     `SELECT * FROM USER INNER JOIN REVIEW ON USER.id = REVIEW.userId where id = ?`,
//     [userId],
//     function (err, rows, fields) {
//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log("err : " + err);
//         res.send(err);
//       }
//     },
//   );
// });

module.exports = router;
