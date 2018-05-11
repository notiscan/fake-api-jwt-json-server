const express = require('express');
const router = express.Router();
const Get = require('./get');

router.get('/', Get);

module.exports = router;
