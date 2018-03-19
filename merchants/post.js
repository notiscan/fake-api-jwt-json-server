const Merchant = require('./schema');

const codes = require('../lib/codes');
const { serverError, duplicateError } = codes;

const byMerchant = (merchant, callback) => {
  const newMerchant = new Merchant(merchant);

  newMerchant.save((err) => {
    callback(err, newMerchant);
  });
};

const byRoute = (req, res) => {
  const data = req.body;
  byMerchant(data, (err, merchant) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }

      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: merchant.id });
  });
};

module.exports = { byRoute, byMerchant };
