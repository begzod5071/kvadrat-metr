import nodemailer from "nodemailer";
import { ISendEmail } from "../config/interfaces";

const sendEmail = async (options: ISendEmail) => {
  const transporter = await nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {},
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
};

export default sendEmail;
