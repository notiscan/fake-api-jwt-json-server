const Transaction = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byIdData = (id, data, callback) => {
  Transaction.findByIdAndUpdate(id, data, (err, transaction) => {
    callback(err, transaction);
  });
};

const byData = (query, data, callback) => {
  Transaction.findOneAndUpdate(query, data).populate('user').exec((err, transaction) => {
    callback(err, transaction);
  });
};

const byIdRoute = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  byIdData(id, data, (err, transaction) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: transaction.id });
  });
};

module.exports = { byIdRoute, byIdData, byData };
