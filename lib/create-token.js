const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

const createToken = ({username, firstname, lastname, email}) => {
  return jwt.sign({ username, firstname, lastname, email }, SECRET_KEY, { expiresIn });
};

module.exports = createToken;
