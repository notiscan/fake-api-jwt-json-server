const express = require('express');
const router = express.Router();
const Post = require('./post');

router.post('/', Post.byRoute);

module.exports = router;
