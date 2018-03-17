const fs = require('fs');
// const request = require('supertest');

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

const codes = require('../lib/codes');
// const createToken = require('../lib/create-token');

const { unauthorized, invalidParams } = codes;

const createPassword = (req, res) => {
  const { pin, tmpPin } = req.body;
  let user = null;
  let usernames = [];

  if (!pin || !tmpPin) {
    res.status(invalidParams.status).json(invalidParams);
    return;
  }

  user = userdb.users.filter((user) => user.pin && user.tmpPin && user.pin === pin && user.tmpPin === tmpPin)[0];
  if (!user || !user.isVerified) {
    res.status(unauthorized.status).json(unauthorized);
    return;
  }

  delete user.pin;
  delete user.tmpPin;
  delete user.isVerified;

  // request(server)
  //   .get('/merchants')
  //   .set('Authorization', `Bearer ${createToken(user)}`)
  //   .end((err, r) => {
  //     if (err) throw err;
  //     usernames = user.accounts.map(account => {
  //       return {
  //         username: account.username,
  //         merchant: r.body.filter((merchant) => merchant.id === account.merchantId)[0]
  //       };
  //     });

  //     res.status(200).json({ usernames });
  //   });
  res.status(200).json({ usernames });
};

module.exports = createPassword;
