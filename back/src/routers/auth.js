import { Router } from "express";
const authRouter = Router();
import axios from "axios";
require("dotenv").config();
import maria from "../db/mariaDB/maria";
import jwt from "jsonwebtoken";

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_GET_USER_INFO_API_URL = "https://kapi.kakao.com/v2/user/me";
const NAVER_OAUTH_TOKEN_API_URL = "https://openapi.naver.com/v1/nid/me";
const grant_type = "authorization_code";
const kakao_client_id = process.env.KAKAO_ID;
const kakao_redirect_uri = process.env.KakaoCallbackURL;

authRouter.get("/kakao", async function (req, res, next) {
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

authRouter.get("/kakao/info/:access_token", async function (req, res, next) {
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
        const token = jwt.sign({ id: rows2.insertId, access_token: access_token }, secretKey);

        res.status(200).json({
          success: true,
          id: rows2.insertId,
          name: result.data.kakao_account.profile.nickname,
          email: email,
          social: "kakao",
          reviews: null,
          greenCrews: null,
          token: token,
        });
      } else {
        const [review] = await maria.execute(
          `SELECT RV.reviewId, GC.title, RV.description, RV.createAt, GC.inProgress
          FROM REVIEW AS RV
          LEFT JOIN GREENCREW AS GC ON GC.crewId = RV.crewId
          WHERE RV.userId = ?`,
          [rows[0].id],
        );

        const [greenCrew] = await maria.execute(
          `SELECT GC.crewId, GC.title, GC.startAt, RT.course, RT.area, GC.inProgress
          FROM USERTOGREENCREW AS UTGC
          LEFT JOIN GREENCREW AS GC ON GC.crewId = UTGC.crewid
          LEFT JOIN ROUTE AS RT ON RT.id = GC.routeId
          WHERE UTGC.userId = ?`,
          [rows[0].id],
        );

        const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);
        res.status(200).json({
          success: true,
          id: rows[0].id,
          name: rows[0].name,
          email: email,
          social: "kakao",
          reviews: review,
          greenCrews: greenCrew,
          token: token,
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

authRouter.get("/naver", async function (req, res, next) {
  const access_token = req.query.access_token;
  console.log(access_token);
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
        const token = jwt.sign({ id: rows2.insertId, access_token: access_token }, secretKey);

        res.status(200).json({
          success: true,
          id: rows2.insertId,
          name: name,
          email: email,
          social: "naver",
          reviews: null,
          greenCrews: null,
          token: token,
        });
      } else {
        const [review] = await maria.execute(
          `SELECT RV.reviewId, GC.title, RV.description, RV.createAt, GC.inProgress
          FROM REVIEW AS RV
          LEFT JOIN GREENCREW AS GC ON GC.crewId = RV.crewId
          WHERE RV.userId = ?`,
          [rows[0].id],
        );

        const [greenCrew] = await maria.execute(
          `SELECT GC.crewId, GC.title, GC.startAt, RT.course, RT.area, GC.inProgress
          FROM USERTOGREENCREW AS UTGC
          LEFT JOIN GREENCREW AS GC ON GC.crewId = UTGC.crewid
          LEFT JOIN ROUTE AS RT ON RT.id = GC.routeId
          WHERE UTGC.userId = ?`,
          [rows[0].id],
        );

        const token = jwt.sign({ id: rows[0].id, access_token: access_token }, secretKey);

        res.status(200).json({
          success: true,
          id: rows[0].id,
          name: rows[0].name,
          social: "naver",
          email: rows[0].email,
          reviews: review,
          greenCrews: greenCrew,
          token: token,
        });
      }
    })

    .catch(err => {
      next(err);
    });
});

export { authRouter };
