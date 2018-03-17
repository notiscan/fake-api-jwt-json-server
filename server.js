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

// Create a token from a payload
const createToken = ({firstname, lastname, email, accounts}) => {
  return jwt.sign({firstname, lastname, email, accounts}, SECRET_KEY, {expiresIn});
}

// Verify the token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

const isAuthenticated = ({ user, password }) => {
  return user.password === password;
};

const getUser = (username) => {
  return userdb.users.filter(user => {
    return user.accounts.findIndex((account) => account.username === username) !== -1;
  })[0] || null;
};

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const status = 401;
  const message = 'Incorrect username or password';

  if (username && password) {
    const user = getUser(username);

    if (user === null) {
      res.status(status).json({ status, message });
      return;
    }

    if (isAuthenticated({ user, password }) === false) {
      res.status(status).json({ status, message });
      return;
    }

    const accessToken = createToken(user);
    res.status(200).json({accessToken});
    return;
  }
  res.status(406).json({
    status: 406,
    message: 'username or password missing in request'
  });
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
