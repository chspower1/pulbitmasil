const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Review" });
});

router.get("/select", function (req, res) {
  maria.query("SELECT * FROM REVIEW", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

// 리뷰 작성
router.post("/create", login_required, async function (req, res, next) {
  const user_id = req.currentUserId;
  try {
    const { title, description, createAt } = req.body;

    maria.query(
      `INSERT INTO REVIEW(user_id, title, description, createAt) VALUES(?,?,?,?)`,
      [user_id, title, description, createAt],
      function (err, rows, fields) {
        if (!err) {
          res.status(200).json({ success: true, title: title, description: description, createAt: createAt });
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

// router.delete("/delete", login_required, async function (req, res, next) {
//   try {
//     const user_id = req.currentUserId;

//     maria.query(` USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
//       if (!err) {
//         res
//           .status(200)
//           .json({ success: true, success: true, email: email, name: rows[0].name, id: rows[0].id, token: token });
//       } else {
//         console.log("err : " + err);
//         res.send(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/modify", login_required, async function (req, res, next) {
//   try {
//     const { name } = req.body;
//     const user_id = req.currentUserId;
//     console.log(user_id);
//     maria.query(`UPDATE USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
//       if (!err) {
//         res.status(200).json({
//           success: true,
//         });
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
