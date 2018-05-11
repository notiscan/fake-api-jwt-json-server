const Account = require('../schema');

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    Account.findOne(query)
      .select('username')
      .exec((err, account) => {
        callback(err, account);
      });
    return;
  }
};

const get = (req, res) => {
  byData(req.query, (err, account) => {
    if (err) {
      return res.status(serverError.status).json(serverError);
    }

    if (account) {
      return res.status(200).json({
        status: 200,
        message: 'Username already exists'
      });
    }

    res.status(404).json({
      status: 404,
      message: 'Username does not exist'
    });
  });
};

module.exports = get;
