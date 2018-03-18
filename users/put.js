const User = require('./schema');
const codes = require('../lib/codes');

const { serverError, duplicateError } = codes;

const byIdData = (id, data, callback) => {
  User.findByIdAndUpdate(id, data, (err, user) => {
    callback(err, user);
  });
};

const byData = (query, data, callback) => {
  User.findOneAndUpdate(query, data)
    .populate({
      path: 'accounts',
      select: 'username',
      populate: {
        path: 'merchant',
        select: 'name description'
      }
    })
    .exec((err, user) => {
      callback(err, user);
    });
};

const byIdRoute = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  byIdData(id, data, (err, user) => {
    if (err) {
      if ((err.name === 'BulkWriteError' || err.name === 'MongoError') && err.code === 11000) {
        res.status(duplicateError.status).send(duplicateError); return;
      }
      res.status(serverError.status).json(serverError); return;
    }
    res.status(201).json({ id: user.id });
  });
};

module.exports = { byIdRoute, byIdData, byData };
