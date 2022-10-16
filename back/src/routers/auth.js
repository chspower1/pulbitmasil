const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const maria = require("../db/connect/maria");
const jwt = require("jsonwebtoken");

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
// const KAKAO_GET_TOKEN_INFO_API_URL = "https://kapi.kakao.com/v1/user/access_token_info";
const KAKAO_GET_USER_INFO_API_URL = "https://kapi.kakao.com/v2/user/me";
const NAVER_OAUTH_TOKEN_API_URL = "https://openapi.naver.com/v1/nid/me";
const grant_type = "authorization_code";
const kakao_client_id = process.env.KAKAO_ID;
const kakao_redirect_uri = process.env.KakaoCallbackURL;

router.get("/kakao", async function (req, res, next) {
  const code = req.query.code;

  axios
    .post(
      `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${kakao_client_id}&redirect_uri=${kakao_redirect_uri}&code=${code}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    )
    .then(result => {
      res.redirect(`/auth/kakao/info/:${result.data.access_token}`);
    })
    // .then(result => {
    //   res.status(200).json(result);
    // })
    .catch(e => {
      // console.log("에러2");
      res.send(e);
    });
});

// router.get("/kakao/decode/:access_token", async function (req, res, next) {
//   const access_token = req.params.access_token;
//   try {
//     axios
//       .get(`${KAKAO_GET_TOKEN_INFO_API_URL}`, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       })
//       .then(result => {
//         const secretKey = process.env.JWT_SECRET_KEY;
//         const token = jwt.sign({ id: result.data.id, access_token: access_token }, secretKey);

//         console.log(
//           "------------------------------------------------------------------------------\n",
//           token,
//           "\n------------------------------------------------------------------------------",
//         );
//         res.status(200).json({ success: true, token: token });
//       })
//       .catch(e => {
//         res.send(e);
//       });
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// });

router.get("/kakao/info/:access_token", async function (req, res, next) {
  const access_token = req.params.access_token;

  axios
    .get(`${KAKAO_GET_USER_INFO_API_URL}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(result => {
      const secretKey = process.env.JWT_SECRET_KEY;

      const email = result.data.kakao_account?.email ?? "kakao" + result.data.id;

      maria.query("SELECT * FROM USER WHERE email = ?", [email], async function (err, rows, fields) {
        if (!err) {
          if (!rows.length) {
            // console.log(111);
            maria.query(
              "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'kakao',1)",
              [result.data.kakao_account.profile.nickname, email],
              async function (err, rows2, fields) {
                const token = jwt.sign(
                  {
                    id: rows2.insertId,
                    access_token: access_token,
                  },
                  secretKey,
                );
                res.status(200).json({
                  success: true,
                  name: result.data.kakao_account.profile.nickname,
                  email: email,
                  social: 1,
                  token: token,
                });
              },
            );
          } else {
            const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);
            res.status(200).json({
              success: true,
              id: rows[0].id,
              name: rows[0].name,
              email: email,
              social: 1,
              token: token,
            });
          }
        }
      });
    })
    .catch(e => {
      res.send(e);
    });
});

router.get("/naver", async function (req, res, next) {
  const access_token = req.query.access_token;
  // console.log(req.query);

  axios
    .get(`${NAVER_OAUTH_TOKEN_API_URL}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(result => {
      const secretKey = process.env.JWT_SECRET_KEY;

      const name = result.data.response.name;
      const email = result.data.response.email;

      maria.query("SELECT * FROM USER WHERE email = ?", [email], async function (err, rows, fields) {
        if (!err) {
          if (!rows.length) {
            maria.query(
              "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'naver', 1)",
              [name, email],
              async function (err, rows2, fields) {
                const token = jwt.sign({ id: rows2.insertId, access_token: access_token }, secretKey);
                res.status(200).json({
                  success: true,
                  name: name,
                  email: email,
                  social: 1,
                  token: token,
                });
              },
            );
          } else {
            const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);

            res
              .status(200)
              .json({ success: true, id: rows[0].id, name: rows[0].name, email: rows[0].email, token: token });
          }
        }
      });
    })
    // .then(result => {
    //   res.status(200).json(result);
    // })
    .catch(e => {
      // console.log("에러2", e);
      res.send(e);
    });
});

// router.get("/naver", async function (req, res, next) {
//   console.log("\n\n\n\n\n");
//   console.log(req);
//   try {
//     axios
//       .post(
//         `${NAVER_OAUTH_TOKEN_API_URL}?response_type=code&client_id=${naver_client_id}&redirect_uri=${naver_redirect_uri}&state=${state};`,
//         {
//           headers: {
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         },
//       )
//       .then(result => {
//         // console.log("------------------------------------------------", result);
//         // res.redirect(`/auth/naver/info/:${result.data.access_token}`);
//         res.status(215).json(result);
//       })
//       // .then(result => {
//       //   res.status(200).json(result);
//       // })
//       .catch(e => {
//         console.log("에러2");
//         res.send(e);
//       });
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// });

// router.get("/naver/info/:access_token", async function (req, res, next) {
//   const access_token = req.params.access_token;
//   try {
//     axios
//       .get(`${NAVER_GET_USER_INFO_API_URL}`, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       })
//       .then(result => {
//         const secretKey = process.env.JWT_SECRET_KEY;

//         const email = result.data.kakao_account?.email ?? "naver" + result.data.id;

//         maria.query("SELECT * FROM USER WHERE email = ?", [email], async function (err, rows, fields) {
//           if (!err) {
//             if (!rows.length) {
//               console.log(111);
//               // console.log(result);
//               // maria.query(
//               //   "INSERT INTO USER(name, email, hashedPassword) VALUES(?,?,'kakao')",
//               //   [result.data.kakao_account.profile.nickname, email],
//               //   async function (err, rows2, fields) {
//               //     const token = jwt.sign({ id: rows2.insertId, access_token: access_token }, secretKey);
//               //     res.status(200).json({ success: true, token: token });
//               //   },
//               // );
//             } else {
//               const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);
//               res.status(200).json({ success: true, token: token });
//             }
//           }
//         });
//       })
//       .catch(e => {
//         res.send(e);
//       });
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// });

module.exports = router;
