const express = require('express');
const secured = require('../middleware/secured');
const router = express.Router();

// /* GET user profile. */
// router.get('/user', secured(), function (req, res, next) {
//   const { _raw, _json, ...userProfile } = req.user;
//   res.status(200).send(JSON.stringify(userProfile, null, 2))
// });

module.exports = router;
