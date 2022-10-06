const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "User" });
});

router.get("/create", async function (req, res) {
  maria.query(
    `CREATE TABLE USER (
    id VARCHAR(50) primary key NOT NULL,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL)`,
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
    const user_id = uuidv4();

    maria.query(
      `INSERT INTO USER(id, name, email, hashedPassword) VALUES(?,?,?,?)`,
      [user_id, name, email, hashedPassword],
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

      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const token = jwt.sign({ id: rows[0].id }, secretKey);

      res.status(200).json({ success: true, email: email, id: rows[0].id, token: token });
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

router.put("/modify", login_required, async function (req, res, next) {
  try {
    const { name } = req.body;
    const user_id = req.currentUserId;
    console.log(user_id);
    maria.query(`UPDATE USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true, message: "success" });
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
