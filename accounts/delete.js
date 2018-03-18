const Account = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const byIdData = (id, callback) => {
  Account.findByIdAndRemove(id, (err) => {
    callback(err, id);
  });
};

const byIdRoute = (req, res) => {
  const id = req.params.id;

  byIdData(id, (err, id) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id });
  });
};

module.exports = { byIdRoute, byIdData };
