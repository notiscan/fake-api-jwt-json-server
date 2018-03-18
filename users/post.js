const User = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byUser = (user, callback) => {
  const newUser = new User(user);

  newUser.save((err) => {
    callback(err, newUser);
  });
};

const byRoute = (req, res) => {
  const data = req.body;
  byUser(data, (err, user) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }

      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: user.id });
  });
};

module.exports = { byRoute, byUser };
