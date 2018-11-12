const store = require('./store');
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

  const response = {
    body: {
      updated_at: "2018-11-10T22:47:52.064596Z",
      ref_id: null,
      time_in_force: data.time_in_force,
      fees: "0.00",
      cancel: "https://api.robinhood.com/orders/106887eb-6913-4cf3-8419-c9875d079f03/cancel/",
      response_category: null,
      id: `${Math.random() * 1000}`,
      cumulative_quantity: "0.00000",
      stop_price: null,
      reject_reason: null,
      instrument: data.instrument.url,
      state: "unconfirmed",
      trigger: "immediate",
      override_dtbp_checks: false,
      type: data.type,
      last_transaction_at: "2018-11-10T22:47:52.008621Z",
      price: `${Number(data.bid_price).toFixed(8)}`,
      executions: [],
      extended_hours: false,
      account: "https://api.robinhood.com/accounts/5SE73046/",
      url: "https://api.robinhood.com/orders/106887eb-6913-4cf3-8419-c9875d079f03/",
      created_at: "2018-11-10T22:47:52.008621Z",
      side: "buy",
      override_day_trade_checks: false,
      position: "https://api.robinhood.com/positions/5SE73046/16543bbd-47df-4ff3-a743-11ff0901743f/",
      average_price: null,
      quantity: `${Number(data.quantity).toFixed(4)}`,
      call_count: 0
    }
  };
  store.orders.push(response);
  res.status(200).json(response);
}

const sell = (req, res) => {
  const data = req.body;
  const response = {
    body: {
      updated_at: "2018-11-10T22:47:52.064596Z",
      ref_id: null,
      time_in_force: data.time_in_force,
      fees: "0.00",
      cancel: "https://api.robinhood.com/orders/106887eb-6913-4cf3-8419-c9875d079f03/cancel/",
      response_category: null,
      id: `${Math.random() * 1000}`,
      cumulative_quantity: "0.00000",
      stop_price: null,
      reject_reason: null,
      instrument: data.instrument.url,
      state: "unconfirmed",
      trigger: "immediate",
      override_dtbp_checks: false,
      type: data.type,
      last_transaction_at: "2018-11-10T22:47:52.008621Z",
      price: `${Number(data.bid_price).toFixed(8)}`,
      executions: [],
      extended_hours: false,
      account: "https://api.robinhood.com/accounts/5SE73046/",
      url: "https://api.robinhood.com/orders/106887eb-6913-4cf3-8419-c9875d079f03/",
      created_at: "2018-11-10T22:47:52.008621Z",
      side: "sell",
      override_day_trade_checks: false,
      position: "https://api.robinhood.com/positions/5SE73046/16543bbd-47df-4ff3-a743-11ff0901743f/",
      average_price: null,
      quantity: `${Number(data.quantity).toFixed(4)}`,
      call_count: 0
    }
  };
  store.orders.push(response);
  res.status(200).json(response);
};

module.exports = {
  buy,
  sell
};
