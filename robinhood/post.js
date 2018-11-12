const credentials = require('./credentials');

const buy = (req, res) => {
  const data = req.body;
  // const data = {
  //   type: 'limit',
  //   quantity: 1,
  //   bid_price: 1.00,
  //   time_in_force: 'gtc',
  //   instrument: {
  //     symbol: 'UVXY',
  //     url: 'https://api.robinhood.com/instruments/16543bbd-47df-4ff3-a743-11ff0901743f/'
  //   }
  // }

  const Robinhood = require('robinhood')(credentials, () => {
    Robinhood.place_buy_order(data, (error, response, body) => {
      if (error) { return res.status(response).json(body); }
      res.status(200).json({ body });
    });
  });
}

const sell = (req, res) => {
  const data = req.body;
  const Robinhood = require('robinhood')(credentials, () => {
    Robinhood.orders(req.params.id, (error, response, body) => {
      if (error) { return res.status(response).json(body); }
      res.status(200).json({ body });
    });
  });
};

module.exports = {
  buy,
  sell
};
