const Transaction = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byTransaction = (transaction, callback) => {
  const newTransaction = new Transaction(transaction);

  newTransaction.save((err) => {
    callback(err, newTransaction);
  });
};

const byRoute = (req, res) => {
  const data = req.body;
  byTransaction(data, (err, transaction) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }

      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: transaction.id });
  });
};

module.exports = { byRoute, byTransaction };
