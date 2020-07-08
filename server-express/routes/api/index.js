const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/data', require('./dataset'));

module.exports = router;