const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "User" });
});

router.get("/create", async function (req, res) {
  maria.query(
    `CREATE TABLE USER (
    id VARCHAR(50) primary key,
    name VARCHAR(10),
    email VARCHAR(30) UNIQUE,
    hashedPassword VARCHAR(100))`,
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

// router.get("/insert", function (req, res) {
//   maria.query(
//     'INSERT INTO USER(id, name, email, hasedPassword) VALUES("aaa","bbb","aa2@aa.com","00000")',
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
          res.send(rows);
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

module.exports = router;
