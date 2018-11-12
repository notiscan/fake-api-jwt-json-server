const credentials = require('./credentials');

const cancel = (req, res) => {
  const Robinhood = require('robinhood')(credentials, () => {
    Robinhood.cancel_order(req.params.id, (error, response, body) => {
      if (error) { return res.status(response).json(body); }
      res.status(200).json({ body });
    });
  });
}

const orders = (req, res) => {
  const Robinhood = require('robinhood')(credentials, () => {
    Robinhood.orders(req.params.id, (error, response, body) => {
      if (error) { return res.status(response).json(body); }
      res.status(200).json({ body });
    });
  });
};

const instrument = (req, res) => {
  const Robinhood = require('robinhood')(credentials, () => {
    Robinhood.instruments(req.params.instrument, (error, response, body) => {
      if (error) { return res.status(response).json(body); }
      res.status(200).json({ body });
    });
  });
}

module.exports = {
  cancel,
  instrument,
  orders
};
