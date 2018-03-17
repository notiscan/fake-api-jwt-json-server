const jwt = require('jsonwebtoken');

const codes = require('../lib/codes');
const { revokedToken, badToken } = codes;

const authorizeRoutes = (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    res.status(badToken.status).json(badToken);
    return;
  }
  try {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(revokedToken.status).json({err, ...revokedToken});
  }
};

module.exports = authorizeRoutes;
