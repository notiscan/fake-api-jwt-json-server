const getUser = require('../lib/get-user');
const codes = require('../lib/codes');
const createToken = require('../lib/create-token');

const { unauthorized, invalidParams } = codes;

const login = (req, res) => {
  const { username, password } = req.body;
  let user = null;

  if (!username || !password) {
    res.status(invalidParams.status).json(invalidParams);
  }

  user = getUser(username);
  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  if (user.password !== password) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  res.status(200).json({ accessToken: createToken(user) });
};

module.exports = login;
