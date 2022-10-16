const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const maria = require("../db/connect/maria");
const jwt = require("jsonwebtoken");

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_GET_USER_INFO_API_URL = "https://kapi.kakao.com/v2/user/me";
const NAVER_OAUTH_TOKEN_API_URL = "https://openapi.naver.com/v1/nid/me";
const grant_type = "authorization_code";
const kakao_client_id = process.env.KAKAO_ID;
const kakao_redirect_uri = process.env.KakaoCallbackURL;

router.get("/kakao", async function (req, res, next) {
  const code = req.query.code;
  await axios
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
    .catch(err => {
      next(err);
    });
});

router.get("/kakao/info/:access_token", async function (req, res, next) {
  const access_token = req.params.access_token;

  await axios
    .get(`${KAKAO_GET_USER_INFO_API_URL}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(async result => {
      const secretKey = process.env.JWT_SECRET_KEY;

      const email = result.data.kakao_account?.email ?? "kakao" + result.data.id;

      const [rows] = await maria.execute("SELECT * FROM USER WHERE email = ?", [email]);

      if (!rows.length) {
        const [rows2] = await maria.execute(
          "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'kakao',1)",
          [result.data.kakao_account.profile.nickname, email],
        );
        const token = jwt.sign({ id: rows2[0].insertId, access_token: access_token }, secretKey);

        res.status(200).json({
          success: true,
          id: rows2[0].insertId,
          name: result.data.kakao_account.profile.nickname,
          email: email,
          social: 1,
          token: token,
        });
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
    })
    .catch(err => {
      next(err);
    });
});

router.get("/naver", async function (req, res, next) {
  const access_token = req.query.access_token;

  await axios
    .get(`${NAVER_OAUTH_TOKEN_API_URL}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(async result => {
      const secretKey = process.env.JWT_SECRET_KEY;

      const name = result.data.response.name;
      const email = result.data.response.email;

      const [rows] = await maria.query("SELECT * FROM USER WHERE email = ?", [email]);
      if (!rows.length) {
        const [rows2] = await maria.query(
          "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'naver', 1)",
          [name, email],
        );
        const token = jwt.sign({ id: rows2[0].insertId, access_token: access_token }, secretKey);
        res.status(200).json({
          success: true,
          id: rows2[0].insertId,
          name: name,
          email: email,
          social: 1,
          token: token,
        });
      } else {
        const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);

        res.status(200).json({ success: true, id: rows[0].id, name: rows[0].name, email: rows[0].email, token: token });
      }
    })

    .catch(err => {
      next(err);
    });
});

module.exports = router;
