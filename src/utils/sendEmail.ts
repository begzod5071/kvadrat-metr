import nodemailer from "nodemailer";
import { ISendEmail } from "../config/interfaces";

const sendEmail = async (options: ISendEmail) => {
  const transporter = await nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "rafikovbegzod5071@gmail.com",
      pass: "rafikhov3009@.com",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) return console.log(err);
    console.log(info);
  });
};

export default sendEmail;
