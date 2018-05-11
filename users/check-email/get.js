const User = require('../schema');

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    User.findOne(query)
      .select('email')
      .exec((err, user) => {
        callback(err, user);
      });
    return;
  }
};

const get = (req, res) => {
  byData(req.query, (err, user) => {
    if (err) {
      return res.status(serverError.status).json(serverError);
    }

    if (user) {
      return res.status(200).json({
        status: 200,
        message: 'Email address already exists'
      });
    }

    res.status(404).json({
      status: 404,
      message: 'Email address does not exist'
    });
  });
};

module.exports = get;
