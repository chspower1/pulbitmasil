const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "User" });
});

// router.get("/create", async function (req, res) {
//   maria.query(
//     `CREATE TABLE USER (
//     id INT primary key AUTO_INCREMENT,
//     name VARCHAR(10) NOT NULL,
//     email VARCHAR(30) UNIQUE NOT NULL,
//     hashedPassword VARCHAR(100) NOT NULL)`,
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

router.get("/select", function (req, res) {
  maria.query("SELECT * FROM USER", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

// 편의를 위한 초기화(롤백안됨)
router.get("/init", function (req, res) {
  maria.query("TRUNCATE TABLE USER;", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

// 회원가입
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    maria.query(
      `INSERT INTO USER(name, email, hashedPassword) VALUES(?,?,?)`,
      [name, email, hashedPassword],
      function (err, rows, fields) {
        if (!err) {
          res.status(200).json({ success: true, message: "user register success" });
        } else {
          console.log("err : " + err);
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

// 로그인
router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  maria.query(`SELECT * FROM USER WHERE email = ?`, [email], async function (err, rows, fields) {
    if (!err & rows.length) {
      const correctPasswordHash = rows[0].hashedPassword;
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false });
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: rows[0].id }, secretKey);

      res.status(200).json({ success: true, email: email, id: rows[0].id, token: token, name: rows[0].name });
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

router.delete("/delete", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    maria.query(` USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
      if (!err) {
        res
          .status(200)
          .json({ success: true, success: true, email: email, name: rows[0].name, id: rows[0].id, token: token });
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put("/modify", login_required, async function (req, res, next) {
  try {
    const { name } = req.body;
    const user_id = req.currentUserId;
    console.log(user_id);
    maria.query(`UPDATE USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
      if (!err) {
        res.status(200).json({
          success: true,
        });
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

// modify 전, 비밀번호 체크
router.post("/verify", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const { password } = req.body;

    maria.query(`SELECT hashedPassword FROM USER WHERE id = ?`, [user_id], async function (err, rows, fields) {
      if (!err) {
        const correctPasswordHash = rows[0].hashedPassword;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
        if (!isPasswordCorrect) {
          return res.json({ success: false });
        }
        res.json({ success: true });
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/mypage", login_required, function (req, res) {
  const userId = req.currentUserId;
  maria.query(
    `SELECT * FROM USER INNER JOIN REVIEW ON USER.id = REVIEW.userId where id = ?`,
    [userId],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    },
  );
});

module.exports = router;
