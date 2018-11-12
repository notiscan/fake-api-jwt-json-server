const express = require('express');
const router = express.Router();
const Get = require('./get');
const Post = require('./post');

router.get('/cancel/:id', Get.cancel);
router.get('/instrument/:instrument', Get.instrument);
router.get('/orders', Get.orders);
router.get('/orders/:id', Get.orders);

router.post('/buy', Post.buy);
router.post('/sell', Post.sell);

module.exports = router;
