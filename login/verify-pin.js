const putUser = require('../users/put');
const codes = require('../lib/codes');

const { invalidParams, serverError } = codes;

const verifyPin = (req, res) => {
  const { pin, tmpPin } = req.body;
  const isVerified = true;

  if (!pin || !tmpPin) {
    res.status(invalidParams.status).json(invalidParams); return;
  }

  putUser.byData({ pin, tmpPin }, { isVerified }, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }

    res.status(200).json({});
  });
};

module.exports = verifyPin;
