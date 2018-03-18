const User = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    User.findOne(query)
      .populate({
        path: 'accounts',
        populate: {
          path: 'merchant'
        }
      })
      .exec((err, user) => {
        callback(err, user);
      });
    return;
  }
  User.find({}, (err, users) => {
    callback(err, users);
  });
};

const byIdData = (id, callback) => {
  User.findById(id)
    .populate({
      path: 'accounts',
      populate: {
        path: 'merchant'
      }
    })
    .exec((err, user) => {
      callback(err, user);
    });
};

const allRoute = (req, res) => {
  byData(req.query, (err, users) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ users });
  });
};

const byIdRoute = (req, res) => {
  byIdData(req.params.id, (err, user) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ user });
  });
};

module.exports = { allRoute, byIdRoute, byData, byIdData };
