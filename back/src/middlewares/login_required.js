import jwt from "jsonwebtoken";

function login_required(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  if (userToken === "null") {
    return res.sendStatus(403);
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

export default login_required;
