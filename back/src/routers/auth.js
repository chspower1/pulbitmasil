const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const maria = require("../db/connect/maria");
const jwt = require("jsonwebtoken");

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_GET_TOKEN_INFO_API_URL = "https://kapi.kakao.com/v1/user/access_token_info";
const KAKAO_GET_USER_INFO_API_URL = "https://kapi.kakao.com/v2/user/me";
const grant_type = "authorization_code";
const client_id = process.env.KAKAO_ID;
const redirect_uri = process.env.KakaoCallbackURL;

router.get("/kakao", async function (req, res, next) {
  const code = req.query.code;

  try {
    axios
      .post(
        `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      )
      .then(result => {
        res.redirect(`/auth/kakao/info/:${result.data.access_token}`);
      })
      .catch(e => {
        console.log("에러2");
        res.send(e);
      });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
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
//         const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
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
  try {
    axios
      .get(`${KAKAO_GET_USER_INFO_API_URL}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(result => {
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ id: result.data.id, access_token: access_token }, secretKey);

        console.log(
          "------------------------------------------------------------------------------\n",
          token,
          result.data.id,
          result.data.kakao_account.profile.nickname,
          result.data.kakao_account?.email,
          "\n------------------------------------------------------------------------------",
        );

        const email = result.data.kakao_account?.email ?? "kakao" + result.data.id;

        maria.query("SELECT email FROM USER WHERE email = ?", [email], async function (err, rows, fields) {
          if (!err) {
            if (!rows.length) {
              maria.query("INSERT INTO USER(name, email, hashedPassword) VALUES(?,?,'kakao')", [
                result.data.kakao_account.profile.nickname,
                email,
              ]);
            }
          }
        });

        res.status(200).json({ success: true, token: token });
      })
      .catch(e => {
        res.send(e);
      });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
