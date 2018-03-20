const express = require('express');
const router = express.Router();

const clearDb = require('./clear-db');
const codes = require('../lib/codes');
const { serverError } = codes;

const Merchant = require('../merchants/schema');
const Account = require('../accounts/schema');
const Transaction = require('../transactions/schema');
const User = require('../users/schema');

const createMerchants = (callback) => {
  const merchants = [{
    name: process.env.SEED_DEFAULT_MERCHANT_NAME,
    description: process.env.SEED_DEFAULT_MERCHANT_DESC,
    gatewayId: 1000
  }];

  for (let i = 1; i < process.env.SEED_MERCHANTS_COUNT; i++) {
    merchants.push({
      name: `Fresh Coffee ${i}`,
      description: `corner store`,
      gatewayId: 1000 + i
    });
  }

  save(Merchant, merchants, callback);
};

const createAccounts = ({ merchants, users }, callback) => {
  const accounts = [{
    username: process.env.SEED_DEFAULT_ACCOUNT_USERNAME,
    merchant: merchants[0]._id,
    user: users[0]._id
  }];

  for (let i = 1; i < process.env.SEED_MERCHANTS_COUNT; i++) {
    accounts.push({
      username: `user${i}`,
      merchant: merchants[i]._id,
      user: users[i]._id
    });
  }

  save(Account, accounts, callback);
};

const createUsers = (callback) => {
  const users = [{
    email: process.env.SEED_DEFAULT_ACCOUNT_EMAIL,
    firstname: 'John',
    lastname: 'Brown',
    password: 'password'
  }];

  for (let i = 1; i < process.env.SEED_MERCHANTS_COUNT; i++) {
    users.push({
      email: `user${i}@example.com`,
      firstname: `John ${i}`,
      lastname: `Brown ${i}`,
      password: `password ${i}`
    });
  }

  save(User, users, callback);
};

const createTransactions = (merchants, callback) => {
  const transactions = [{
    item: 'Blue Toy',
    merchant: merchants[0]._id,
    description: 'blue toy'
  }];

  for (let i = 1; i < process.env.SEED_MERCHANTS_COUNT; i++) {
    transactions.push({
      item: `Blue Toy ${i}`,
      merchant: merchants[i]._id,
      description: `blue toy ${i}`
    });
  }

  save(Transaction, transactions, callback);
};

const save = (Model, data, callback) => {
  Model.insertMany(data)
    .then((m) => {
      callback(null, m);
    })
    .catch((err) => {
      console.error(err);
      callback(err);
    });
};

const updateMerchants = ({ accounts, transactions }, callback) => {
  const accountUpdates = accounts.map(account => {
    return {
      updateOne: {
        filter: {
          _id: account.merchant
        },
        update: {
          $push: {
            accounts: account.id
          }
        }
      }
    };
  });

  const transactionUpdates = transactions.map(transaction => {
    return {
      updateOne: {
        filter: {
          _id: transaction.merchant
        },
        update: {
          $push: {
            transactions: transaction.id
          }
        }
      }
    };
  });

  Merchant.bulkWrite([...accountUpdates, ...transactionUpdates])
    .then((m) => {
      callback(null, m);
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};

const updateUsers = (accounts, callback) => {
  const accountUpdates = accounts.map(account => {
    return {
      updateOne: {
        filter: {
          _id: account.user
        },
        update: {
          $push: {
            accounts: account._id
          }
        }
      }
    };
  });

  User.bulkWrite(accountUpdates)
    .then((m) => {
      console.log(m.nModified);
      callback(null, m);
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};

router.post('/', (req, res) => {
  clearDb();

  createMerchants((err, merchants) => {
    if (err) return res.status(serverError.status).json(serverError);

    createUsers((err, users) => {
      if (err) return res.status(serverError.status).json(serverError);

      createAccounts({ merchants, users }, (err, accounts) => {
        if (err) return res.status(serverError.status).json(serverError);

        createTransactions(merchants, (err, transactions) => {
          if (err) return res.status(serverError.status).json(serverError);

          updateMerchants({ accounts, transactions }, (err) => {
            if (err) return res.status(serverError.status).json(serverError);

            updateUsers(accounts, (err) => {
              if (err) return res.status(serverError.status).json(serverError);

              res.status(200).json({
                status: 200,
                message: 'database successfully seeded'
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
