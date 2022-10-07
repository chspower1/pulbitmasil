const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const grant_type = "authorization_code";
const client_id = process.env.KAKAO_ID;
const redirect_uri = process.env.KakaoCallbackURL;

router.get("/kakao/code", function (req, res, next) {
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
        console.log(result.data);
        // 토큰을 활용한 로직을 적어주면된다.
      })
      .catch(e => {
        console.log(e);
        res.send(e);
      });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
