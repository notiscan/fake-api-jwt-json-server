const User = require('../users/schema');
const Merchant = require('../merchants/schema');
const Account = require('../accounts/schema');

const codes = require('../lib/codes');
const { serverError, duplicateError, accountCreated } = codes;

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
    if (err) { callback(err); return; }
    newAccount.merchant = merchant.id;

    newAccount.save((err, account) => {
      if (err) { callback(err); return; }
      newUser.accounts = [account.id];

      newUser.save((err, user) => {
        if (err) { callback(err); return; }

        Merchant.findByIdAndUpdate(merchant.id, {
          accounts: [account.id]
        }, (err) => {
          if (err) { callback(err); return; }
          Account.findByIdAndUpdate(account.id, {
            user: user.id
          }, (err, account) => {
            callback(err);
          });
        });
      });
    });
  }); 
};

const byRoute = (req, res) => {
  const data = req.body;
  
  byNewAcount(data, (err) => {
    if (err) {
      if ((err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }
      res.status(serverError.status).json(serverError); return;
    }

    res.status(201).json(accountCreated);
  });
};

module.exports = { byRoute };
