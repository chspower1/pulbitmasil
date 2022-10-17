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

      if (!rows.length) {
        const [rows2] = await maria.execute(
          "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'kakao','kakao')",
          [result.data.kakao_account.profile.nickname, email],
        );
        const token = jwt.sign({ id: rows2[0].insertId, access_token: access_token }, secretKey);

        res.status(200).json({
          success: true,
          id: rows2[0].insertId,
          name: result.data.kakao_account.profile.nickname,
          email: email,
          social: "kakao",
          reviewId: NULL,
          crewId: NULL,
          token: token,
        });
      } else {
        const reviewId = [];
        const crewId = [];
        for (i in rows) {
          reviewId.push(rows[i].reviewId);
          crewId.push(rows[i].crewId);
        }
        const set1 = new Set(reviewId);
        const set2 = new Set(crewId);

        const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);
        res.status(200).json({
          success: true,
          id: rows[0].id,
          name: rows[0].name,
          email: email,
          social: "kakao",
          reviewId: [...set1],
          crewId: [...set2],
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

      const [rows] = await maria.query(
        `SELECT A.id, A.email, A.name, A.social, A.hashedPassword, B.reviewId, C.crewId
      FROM USER AS A
      LEFT JOIN REVIEW AS B
      ON A.id = B.userId
      LEFT JOIN USERTOGREENCREW AS C
      ON A.id = C.userId
      WHERE A.email = ?`,
        [email],
      );
      if (!rows.length) {
        const [rows2] = await maria.query(
          "INSERT INTO USER(name, email, hashedPassword,social) VALUES(?,?,'naver', 'naver')",
          [name, email],
        );
        const token = jwt.sign({ id: rows2[0].insertId, access_token: access_token }, secretKey);
        res.status(200).json({
          success: true,
          id: rows2[0].insertId,
          name: name,
          email: email,
          social: "naver",
          reviewId: NULL,
          crewId: NULL,
          token: token,
        });
      } else {
        const reviewId = [];
        const crewId = [];
        for (i in rows) {
          reviewId.push(rows[i].reviewId);
          crewId.push(rows[i].crewId);
        }
        const set1 = new Set(reviewId);
        const set2 = new Set(crewId);

        const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);
        res.status(200).json({
          success: true,
          id: rows[0].id,
          name: rows[0].name,
          social: "naver",
          email: rows[0].email,
          reviewId: [...set1],
          crewId: [...set2],
          token: token,
        });
      }
    })

    .catch(err => {
      next(err);
    });
});

module.exports = router;
