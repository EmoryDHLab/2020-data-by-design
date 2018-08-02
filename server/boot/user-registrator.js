'use strict';
module.exports = function(app) {
  var Reader = app.models.Reader;
  Reader.create({
    email: 't@test.com',
    password: '123456',
    firstName: 'Adam',
    lastName: 'Hayward'
  },
  function(err, userInstance) {
    console.log(userInstance);
  });
};
