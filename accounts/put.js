const Account = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byIdData = (id, data, callback) => {
  Account.findByIdAndUpdate(id, data, (err, account) => {
    callback(err, account);
  });
};

const byData = (query, data, callback) => {
  Account.findOneAndUpdate(query, data)
    .populate('user')
    .exec((err, account) => {
      callback(err, account);
    });
};

const byIdRoute = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  byIdData(id, data, (err, account) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: account.id });
  });
};

module.exports = { byIdRoute, byIdData, byData };
