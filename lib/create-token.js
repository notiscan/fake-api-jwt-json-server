const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

const createToken = ({firstname, lastname, email, accounts}) => {
  return jwt.sign({firstname, lastname, email, accounts}, SECRET_KEY, {expiresIn});
};

module.exports = createToken;
