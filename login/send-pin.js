const putUser = require('../users/put');
const sendMail = require('../lib/send-mail');

const codes = require('../lib/codes');
const { invalidParams, serverError, unauthorized } = codes;

const sendPin = (req, res) => {
  const { tmpPin } = req.body;
  const pin = Math.floor(Math.random() * 90000) + 10000;

  if (!tmpPin) {
    res.status(invalidParams.status).json(invalidParams); return;
  }

  putUser.byData({ tmpPin }, { pin }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }

    if (!user) {
      res.status(unauthorized.status).json(unauthorized); return;
    }

    sendMail({ email: user.email, pin }, (err, info) => {
      if (err) {
        res.status(serverError.status).json(serverError);
        return;
      }

      res.status(200).json(info);
    });
  });
};

module.exports = sendPin;
