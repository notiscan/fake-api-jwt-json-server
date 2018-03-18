const express = require('express');
const router = express.Router();

const Delete = require('./delete');
const Get = require('./get');
const Post = require('./post');
const Put = require('./put');

router.delete('/:id', Delete.byIdRoute);
router.get('/', Get.allRoute);
router.get('/:id', Get.byIdRoute);
router.patch('/:id', Put.byIdRoute);
router.post('/', Post.byRoute);
router.put('/:id', Put.byIdRoute);

module.exports = router;
