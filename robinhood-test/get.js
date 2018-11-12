const store = require('./store');
const credentials = require('./credentials');

const cancel = (req, res) => {
  const order = store.orders.filter(order => order.body.id === req.params.id)[0];
  order.body.state = 'cancelled';
  store.orders = [
    ...store.orders.filter(order => order.id !== req.params.id),
    { ...order }
  ];
  res.status(200).json({ ...order });
}

const orders = (req, res) => {
  if (req.params.id) {
    const order = store.orders.filter(order => order.body.id === req.params.id)[0];
    const balance = Number(order.body.quantity) - Number(order.body.cumulative_quantity);
    let mods = {};

    if (balance > 0 && order.body.state !== 'cancelled') {
      mods = {
        call_count: order.body.call_count + 1,
        cumulative_quantity: `${Number(order.body.call_count + 1).toFixed(4)}`
      };
    }

    if (balance === 0 && order.body.state !== 'cancelled') {
      mods = {
        ...mods,
        state: 'filled'
      }
    }

    order.body = {
      ...order.body,
      ...mods
    }

    store.orders = [
      ...store.orders.filter(order => order.id !== req.params.id),
      { ...order }
    ];
    return res.status(200).json(order);
  }
  res.status(200).json({
    body: {
      results: store.orders.map(orders => orders.body)
    }
  })
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
