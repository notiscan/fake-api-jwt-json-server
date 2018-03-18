const putUser = require('../users/put');
const codes = require('../lib/codes');

const { invalidParams, serverError, unauthorized } = codes;

const forgotPassword = (req, res) => {
  const { username, email } = req.body;
  const tmpPin = Math.floor(Math.random() * 90000) + 10000;

  if (!username || !email) {
    res.status(invalidParams.status).json(invalidParams); return;
  }

  putUser.byData({ email }, { tmpPin }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }

    if (!user || user.accounts.findIndex((account) => account.username === username) === -1) {
      res.status(unauthorized.status).json(unauthorized); return;
    }

    res.status(200).json({ tmpPin });
  });
};

module.exports = forgotPassword;
