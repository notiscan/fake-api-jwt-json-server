const User = require('../users/schema');
const Merchant = require('../merchants/schema');
const Account = require('../accounts/schema');

const codes = require('../lib/codes');
const { serverError, duplicateError } = codes;

const byNewAcount = (data, callback) => {
  const {
    firstname,
    lastname,
    phone,
    email,
    password,
    merchantName,
    merchantDescription,
    username
  } = data;

  const newAccount = new Account({ username });

  const newUser = new User({
    firstname,
    lastname,
    email,
    password
  });

  const newMerchant = new Merchant({
    name: merchantName,
    description: merchantDescription
  });

  newMerchant.save((err, merchant) => {
    
    newAccount.merchant = merchant.id;
    newAccount.save((err, account) => {
      newUser.account = [account.id];
      newUser.save((err, user) => {
        callback(err, user);
      });
    });
  });
};

const byRoute = (req, res) => {
  const data = req.body;
  console.log(data);
  byNewAcount(data, (err, user) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }

      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: user.id });
  });
};

module.exports = { byRoute };
