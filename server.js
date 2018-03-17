const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';
const expiresIn = '1h';

const invalidParams = {
  status: 406,
  message: 'missing request parameters'
};
const unauthorized = {
  status: 401,
  message: 'unauthorized access'
};

// Create a token from a payload
const createToken = ({firstname, lastname, email, accounts}) => {
  return jwt.sign({firstname, lastname, email, accounts}, SECRET_KEY, {expiresIn});
};

const getUser = (username) => {
  return userdb.users.filter(user => {
    return user.accounts.findIndex((account) => account.username === username) !== -1;
  })[0] || null;
};

server.post('/auth/login', (req, res) => {
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
});

server.post('/auth/login/forgot-username', (req, res) => {
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
});

server.post('/auth/login/forgot-password', (req, res) => {
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
});

server.post('/auth/login/send-pin', (req, res) => {
  const { tmpPin } = req.body;
  let user = null;

  if (!tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.tmpPin && user.tmpPin === tmpPin)[0];
  if (!user) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  user.pin = Math.floor(Math.random() * 90000) + 10000;

  res.status(200).json({ pin: user.pin });
});

server.post('/auth/login/verify-pin', (req, res) => {
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
});

server.post('/auth/login/create-password', (req, res) => {
  const { password, pin, tmpPin } = req.body;
  let user = null;

  if (!password || !pin || !tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.pin && user.tmpPin && user.pin === pin && user.tmpPin === tmpPin)[0];
  if (!user || !user.isVerified) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  user.passwords = user.passwords || [];
  if (user.passwords.includes(password)) {
    res.status(403).json({
      status: 403,
      message: 'cannot use previously used password'
    });
    return;
  }

  user.password = password;
  if (user.passwords.length >= 5) {
    user.passwords.shift();
  }
  user.passwords.push(password);

  delete user.pin;
  delete user.tmpPin;
  delete user.isVerified;

  res.status(200).json({});
});

server.post('/auth/login/select-username', (req, res) => {
  const { pin, tmpPin } = req.body;
  let user = null;
  let usernames = [];

  if (!pin || !tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.pin && user.tmpPin && user.pin === pin && user.tmpPin === tmpPin)[0];
  if (!user || !user.isVerified) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  usernames = user.accounts.map(account => {
    return {
      username: account.username,
      merchantId: account.merchantId
    };
  });

  delete user.pin;
  delete user.tmpPin;
  delete user.isVerified;

  res.status(200).json({ usernames });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({status, message});
    return;
  }
  try {
    jwt.verify(req.headers.authorization.split(' ')[1], SECRET_KEY);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error accessToken is revoked';
    res.status(status).json({status, message, err});
  }
});

server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log('Run Auth API Server');
});
