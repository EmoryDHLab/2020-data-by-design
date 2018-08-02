'use strict';

module.exports = function(server) {
  var User = server.models.User;
  var router = server.loopback.Router();
  router.get('/', (req, res) => res.send('asdf'));
  server.use('/api/auth', router);
};
