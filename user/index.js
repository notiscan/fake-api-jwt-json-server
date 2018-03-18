const express = require('express');
const router = express.Router();

const Delete = require('./delete');
const Get = require('./get');
const Post = require('./post');
const Put = require('./put');

router.delete('/:id', Delete);
router.get('/', Get.all);
router.get('/:id', Get.byId);
router.patch('/:id', Put);
router.post('/', Post);
router.put('/:id', Put);

module.exports = router;
