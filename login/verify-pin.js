const fs = require('fs');

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const codes = require('../lib/codes');

const { unauthorized, invalidParams } = codes;

const verifyPin = (req, res) => {
  const { pin, tmpPin } = req.body;
  let user = null;

  if (!pin || !tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.pin && user.tmpPin && user.pin === pin && user.tmpPin === tmpPin)[0];
  user.isVerified = true;

  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  res.status(200).json({});
};

module.exports = verifyPin;
