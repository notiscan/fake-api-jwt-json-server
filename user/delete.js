const User = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const Delete = (id, callback) => {
  User.findByIdAndRemove(id, (err) => {
    callback(err, id);
  });
};

const route = (req, res) => {
  const id = req.params.id;

  Delete(id, (err, id) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id });
  });
};

module.exports = route;
