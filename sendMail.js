const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'nwjq6c2rwg4beyuh@ethereal.email',
//     pass: 'qUxhbAgewsccCH7dJa'
//   }
// });

const sendGridtransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  requiresAuth: true,
  auth: {
    user: 'eanarh',
    pass: '97plymouth'
  }
});

const mailOptions = ({ email, pin }) => ({
  from: 'Authorize.NET Dev <noreply@mintymint.herokuapp.com>',
  to: email,
  subject: 'PIN for Authorize.NET Account',
  text: `Requested PIN is ${pin}`,
  html: `<b>Requested PIN is ${pin}</b>`
});

const sendMail = (user, callback) => {
  sendGridtransporter.sendMail(mailOptions(user), (err, info) => {
    if (err) console.error(err);
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    if (typeof callback === 'function') {
      callback(err, info);
    }
  });
};

module.exports = sendMail;
