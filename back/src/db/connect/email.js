const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const emailForpwdChange = async userEmail => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "grassdrink09@gmail.com",
      pass: "fihpkwjeqrecxmgp",
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"풀빛마실" <grassdrink09@gmail.com>`,
    to: userEmail,
    subject: "비밀번호 초기화",
    html: fs.readFileSync(path.join(__dirname, "./index.html"), { encoding: "utf-8" }),
  });
};

module.exports = emailForpwdChange;
