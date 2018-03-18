const Merchant = require('./schema');
const codes = require('../lib/codes');

const { serverError } = codes;

const byData = (query = {}, callback) => {
  if (Object.keys(query).length !== 0) {
    Merchant.findOne(query)
      .populate({
        path: 'accounts',
        select: 'username',
        populate: {
          path: 'user',
          select: 'email username firstname lastname'
        }
      })
      .exec((err, merchant) => {
        callback(err, merchant);
      });
    return;
  }

  Merchant.find({})
    .exec((err, merchants) => {
      callback(err, merchants);
    });
};

const byIdData = (id, callback) => {
  Merchant.findById(id)
    .populate({
      path: 'accounts',
      select: 'username',
      populate: {
        path: 'user',
        select: 'email username firstname lastname'
      }
    }).exec((err, merchant) => {
      callback(err, merchant);
    });
};

const allRoute = (req, res) => {
  byData(req.query, (err, merchants) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ merchants });
  });
};

const byIdRoute = (req, res) => {
  byIdData(req.params.id, (err, merchant) => {
    if (err) {
      res.status(serverError.status).json(serverError); return;
    }
    res.status(200).json({ merchant });
  });
};

module.exports = { allRoute, byIdRoute, byData, byIdData };
