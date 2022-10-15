const jwt = require("jsonwebtoken");

function login_required(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  if (userToken === "null") {
    return res.status(400).send("로그인한 유저만 사용할 수 있는 서비스");
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}

module.exports = login_required;
