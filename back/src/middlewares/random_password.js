function random_password(req, res, next) {
  const chars = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$",
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@-#$",
  ];

  try {
    const randPwd = [9, 4, 2]
      .map(function (len, i) {
        return Array(len)
          .fill(chars[i])
          .map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
          })
          .join("");
      })
      .concat()
      .join("")
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");

    req.randPwd = randPwd;
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
}

module.exports = random_password;
