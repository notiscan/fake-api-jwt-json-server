const Account = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    Account.findOne(query)
      .select('username user')
      .populate({
        path: 'user',
        select: 'email username firstname lastname password'
      })
      .exec((err, account) => {
        callback(err, account);
      });
    return;
  }

  Account.find({}).exec((err, accounts) => {
    callback(err, accounts);
  });
};

const byIdData = (id, callback) => {
  Account.findById(id)
    .populate({
      path: 'user',
      select: 'email username firstname lastname password'
    }).exec((err, account) => {
      callback(err, account);
    });
};

const allRoute = (req, res) => {
  byData(req.query, (err, accounts) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ accounts });
  });
};

const byIdRoute = (req, res) => {
  byIdData(req.params.id, (err, account) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ account });
  });
};

module.exports = { allRoute, byIdRoute, byData, byIdData };
