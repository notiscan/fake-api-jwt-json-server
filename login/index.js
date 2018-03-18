const putAccount = require('../accounts/put');
const codes = require('../lib/codes');
const createToken = require('../lib/create-token');

const { unauthorized, invalidParams } = codes;

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(invalidParams.status).json(invalidParams);
  }

  putAccount.byData({ username }, { $push: { 'loginHistory': new Date() } }, (err, account) => {
    if (err || !account || account.user.password !== password) {
      res.status(unauthorized.status).json(unauthorized); return;
    }

    res.status(200).json({ accessToken: createToken({
      email: account.user.email,
      firstname: account.user.firstname,
      lastname: account.user.lastname,
      username: username
    })});
  });
};

module.exports = login;
