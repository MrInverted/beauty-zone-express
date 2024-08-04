import nodemailer from "nodemailer"

const nodemailerUser = process.env.NODEMAILER_USER;
const nodemailerPass = process.env.NODEMAILER_PASS;

if (!nodemailerUser) throw new Error("NODEMAILER_USER .env variable is missed");
if (!nodemailerPass) throw new Error("NODEMAILER_PASS; .env variable is missed");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});

const sendMail = (to: string, text: string) => {
  transporter.sendMail({
    from: nodemailerUser,
    to: to,
    subject: "Registration success",
    text: text
  }, (err, info) => {
    console.log({ err, info })
  })
};

export { sendMail }