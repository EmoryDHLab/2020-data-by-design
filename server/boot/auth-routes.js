'use strict';

module.exports = function(server) {
  // var User = server.models.Reader;
  var router = server.loopback.Router();
  router.get('/', (req, res) => res.send('asdf'));
  // router.get('/login', (req, res) => {
  //   Reader.login({
  //     email: req.body.email,
  //     password: req.body.password,
  //   }, 'reader', (err, token) => {
  //     if (err) {
  //       return res.status(401).send({
  //         code: 401,
  //         message: "Login failed"
  //       })
  //     }
  //     res.status(204).send({})
  //   })
  // });
  server.use('/api/auth', router);
};
