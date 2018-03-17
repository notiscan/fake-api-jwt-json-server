const fs = require('fs');

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const codes = require('../lib/codes');

const { unauthorized, invalidParams } = codes;

const forgotUsername = (req, res) => {
  const { firstname, lastname, email } = req.body;
  let user = null;

  if (!firstname || !lastname || !email) {
    res.status(invalidParams.status).json(invalidParams);
  }

  user = userdb.users.filter(user => (
    user.firstname.toLowerCase() === firstname.toLowerCase() &&
    user.lastname.toLowerCase() === lastname.toLowerCase() &&
    user.email.toLowerCase() === email.toLowerCase()
  ))[0];
  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  user.tmpPin = Math.floor(Math.random() * 90000) + 10000;

  res.status(200).json({ tmpPin: user.tmpPin });
};

module.exports = forgotUsername;
