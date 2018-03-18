const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS
  }
});

const sendGridtransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  requiresAuth: true,
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS
  }
});

const mailOptions = ({ email, pin }) => ({
  from: `Authorize.NET Dev <${process.env.SENDGRID_EMAIL_FROM}>`,
  to: email,
  subject: 'PIN for Authorize.NET Account',
  text: `Requested PIN is ${pin}`,
  html: `<b>Requested PIN is ${pin}</b>`
});

const sendMail = (user, callback) => {
  if (process.env.EMAIL_ENV === 'production') {
    transporter = sendGridtransporter;
  }

  transporter.sendMail(mailOptions(user), (err, info) => {
    if (err) console.error(err);

    info = {};

    if (process.env.EMAIL_ENV === 'development') {
      info = { url: nodemailer.getTestMessageUrl(info) };
    }

    if (typeof callback === 'function') {
      callback(err, info);
    }
  });
};

module.exports = sendMail;
