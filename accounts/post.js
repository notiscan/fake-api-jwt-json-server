const Account = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byAccount = (account, callback) => {
  const newAccount = new Account(account);

  newAccount.save((err) => {
    callback(err, newAccount);
  });
};

const byRoute = (req, res) => {
  const data = req.body;
  byAccount(data, (err, account) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }

      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: account.id });
  });
};

module.exports = { byRoute, byAccount };
