const Merchant = require('../merchants/schema');
const Account = require('../accounts/schema');
const Transactions = require('../transactions/schema');
const User = require('../users/schema');

const clearDb = () => {
  Merchant.collection.drop();
  Account.collection.drop();
  Transactions.collection.drop();
  User.collection.drop();
};

module.exports = clearDb;
