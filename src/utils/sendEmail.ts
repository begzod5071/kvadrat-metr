import nodemailer from "nodemailer";
import { ISendEmail } from "../config/interfaces";

const sendEmail = async (options: ISendEmail) => {
  const transporter = await nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "jahongirmh@gmail.com",
      pass: "7008779a",
    },
  });

  const mailOptions = {
    from: "jahongirmh@gmail.com",
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
