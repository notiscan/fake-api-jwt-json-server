const Merchant = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byIdData = (id, data, callback) => {
  Merchant.findByIdAndUpdate(id, data, (err, merchant) => {
    callback(err, merchant);
  });
};

const byData = (query, data, callback) => {
  Merchant.findOneAndUpdate(query, data).populate('user').exec((err, merchant) => {
    callback(err, merchant);
  });
};

const byIdRoute = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  byIdData(id, data, (err, merchant) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: merchant.id });
  });
};

module.exports = { byIdRoute, byIdData, byData };
