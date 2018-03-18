const putUser = require('../users/put');
const codes = require('../lib/codes');

const { invalidParams, serverError, unauthorized } = codes;

const createPassword = (req, res) => {
  const { pin, tmpPin, email, password } = req.body;
  const isVerified = true;

  if (!pin || !tmpPin || !email || !password) {
    res.status(invalidParams.status).json(invalidParams); return;
  }

  const reset = {
    pin: null,
    tmpPin: null,
    isVerified: false
  };

  putUser.byData({ pin, tmpPin, email, isVerified }, { password, ...reset }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }

    if (!user) {
      res.status(unauthorized.status).json(unauthorized); return;
    }

    res.status(200).json({});
  });
};

module.exports = createPassword;
