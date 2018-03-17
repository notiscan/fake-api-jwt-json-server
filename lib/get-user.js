const fs = require('fs');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const getUser = (username) => {
  return userdb.users.filter(user => {
    return user.accounts.findIndex((account) => account.username === username) !== -1;
  })[0] || null;
};

module.exports = getUser;
