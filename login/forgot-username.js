const putUser = require('../users/put');
const codes = require('../lib/codes');

const { invalidParams, serverError } = codes;

const forgotUsername = (req, res) => {
  const { firstname, lastname, email } = req.body;
  const tmpPin = Math.floor(Math.random() * 90000) + 10000;

  if (!firstname || !lastname || !email) {
    res.status(invalidParams.status).json(invalidParams);
  }

  putUser.byData({ firstname, lastname, email }, { tmpPin }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ tmpPin });
  });
};

module.exports = forgotUsername;
