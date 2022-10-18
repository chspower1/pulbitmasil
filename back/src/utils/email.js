import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
require("dotenv").config();

const emailForTempPassword = async (userEmail, tempPassword) => {
  fs.readFile(path.join(__dirname, "./index.handlebars"), "utf8", async function (err, data) {
    const compiledTemplate = Handlebars.compile(data);

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

    await transporter.sendMail({
      from: `"풀빛마실" ${process.env.Gmail_user}`,
      to: userEmail,
      subject: "비밀번호 초기화",
      html: compiledTemplate({ tempPassword: tempPassword }),
    });
  });
};

export { emailForTempPassword };
