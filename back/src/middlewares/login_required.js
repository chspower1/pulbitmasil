const jwt = require("jsonwebtoken");

function login_required(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  console.log(req.headers["authorization"]);
  if (userToken === "null") {
    return res.sendStatus(408);
  }

  try {
    console.log("로그인 인증 동작");
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    return res.sendStatus(408);
  }
}

module.exports = login_required;
