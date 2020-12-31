const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/data', require('./dataset'));
router.use('/doc', require('./doc'));

module.exports = router;
