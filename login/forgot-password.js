const putUser = require('../users/put');
const codes = require('../lib/codes');

const { invalidParams, serverError } = codes;

const forgotPassword = (req, res) => {
  const { username, email } = req.body;
  const tmpPin = Math.floor(Math.random() * 90000) + 10000;

  if (!username || !email) {
    res.status(invalidParams.status).json(invalidParams);
  }

  putUser.byData({ email }, { tmpPin }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ tmpPin });
  });
};

module.exports = forgotPassword;
