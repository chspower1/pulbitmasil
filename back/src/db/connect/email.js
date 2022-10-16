const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
require("dotenv").config();

const emailForTempPassword = async (userEmail, tempPassword) => {
  const template = fs.readFileSync(path.join(__dirname, "./index.handlebars"), { encoding: "utf-8" });
  const compiledTemplate = Handlebars.compile(template);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.Gmail_user,
      pass: process.env.Gmail_pass,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"풀빛마실" <grassdrink09@gmail.com>`,
    to: userEmail,
    subject: "비밀번호 초기화",
    html: compiledTemplate({ tempPassword: tempPassword }),
  });
};

module.exports = emailForTempPassword;
