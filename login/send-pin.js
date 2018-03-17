const fs = require('fs');

const sendMail = require('../lib/send-mail');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const codes = require('../lib/codes');
const { unauthorized, invalidParams } = codes;

const sendPin = (req, res) => {
  const { tmpPin } = req.body;
  let user = null;

  if (!tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.tmpPin && user.tmpPin === tmpPin)[0];
  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  user.pin = Math.floor(Math.random() * 90000) + 10000;

  sendMail(user, (err, info) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: 'error sending pin'
      });
      return;
    }
    res.status(200).json({});
  });
};

module.exports = sendPin;
