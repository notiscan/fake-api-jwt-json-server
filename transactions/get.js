const Transaction = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    Transaction.findOne(query)
      .populate({
        path: 'merchant'
      })
      .exec((err, transaction) => {
        callback(err, transaction);
      });
    return;
  }

  Transaction.find({})
    .exec((err, transactions) => {
      callback(err, transactions);
    });
};

const byIdData = (id, callback) => {
  Transaction.findById(id)
    .populate({
      path: 'merchant'
    })
    .exec((err, transaction) => {
      callback(err, transaction);
    });
};

const allRoute = (req, res) => {
  byData(req.query, (err, transactions) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ transactions });
  });
};

const byIdRoute = (req, res) => {
  byIdData(req.params.id, (err, transaction) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ transaction });
  });
};

module.exports = { allRoute, byIdRoute, byData, byIdData };
