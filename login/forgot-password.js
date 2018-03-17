const codes = require('../lib/codes');
const getUser = require('../lib/get-user');

const { unauthorized, invalidParams } = codes;

const forgotPassword = (req, res) => {
  const { username, email } = req.body;
  let user = null;

  if (!username || !email) {
    res.status(invalidParams.status).json(invalidParams);
  }

  user = getUser(username);
  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  user.tmpPin = Math.floor(Math.random() * 90000) + 10000;

  res.status(200).json({ tmpPin: user.tmpPin });
};

module.exports = forgotPassword;
