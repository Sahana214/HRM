import nodemailer from "nodemailer";

export const sendAlert = async (email, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "HRM Alert",
    text: message,
  });
};