const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_DECODE_TOKEN_API_URL = "https://kapi.kakao.com/v1/user/access_token_info";
const grant_type = "authorization_code";
const client_id = process.env.KAKAO_ID;
const redirect_uri = process.env.KakaoCallbackURL;

router.get("/kakao", function (req, res, next) {
  let code = req.query.code;
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
        axios
          .get(`${KAKAO_DECODE_TOKEN_API_URL}`, {
            headers: {
              Authorization: `Bearer ${result.data.access_token}`,
            },
          })
          .then(res => {
            const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
            const token = jwt.sign({ id: res.data.id, access_token: result.data.access_token }, secretKey);

            res.status(200).json({ success: true, token: token });
          })
          .catch(e => {
            console.log("에러1");
            res.send(e);
          });
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

module.exports = router;
