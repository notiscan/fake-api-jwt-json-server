const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'nwjq6c2rwg4beyuh@ethereal.email',
    pass: 'qUxhbAgewsccCH7dJa'
  }
});

  // setup email data with unicode symbols
const mailOptions = ({ email, pin }) => ({
  from: '"Authorize.NET <noreply@authorize.net>',
  to: email,
  subject: 'PIN for Authorize.NET Account',
  text: `Requested PIN is ${pin}`,
  html: `<b>Requested PIN is ${pin}</b>`
});

const sendMail = (user, callback) => {
  transporter.sendMail(mailOptions(user), (err, info) => {
    if (err) console.error(err);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    if (typeof callback === 'function') {
      callback(err);
    }
  });
};

module.exports = sendMail;
