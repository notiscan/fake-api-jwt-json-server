const User = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const getAll = (query, callback) => {
  if (Object.keys(query).length !== 0) {
    User.findOne(query, 'name email', (err, user) => {
      callback(err, user);
    });
    return;
  }
  User.find({}, (err, users) => {
    callback(err, users);
  });
};

const getById = (id, callback) => {
  User.findById(id, (err, user) => {
    callback(err, user);
  });
};

const all = (req, res) => {
  getAll(req.query, (err, users) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ users });
  });
};

const byId = (req, res) => {
  getById(req.params.id, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ user });
  });
};

module.exports = { all, byId };
