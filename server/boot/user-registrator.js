'use strict';
module.exports = function(app) {
  const models = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Reader']
  app.dataSources.mysqlDs.automigrate(models, (err) => {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Reader = app.models.Reader;
    Reader.create({
      email: 't@test.com',
      password: '12345678',
      firstName: 'Adam',
      lastName: 'Hayward'
    }, function(err, userInstance) {
      console.log(userInstance);
    })
    Reader.create({
      email: 'achayward1@gmail.com',
      password: 'insecure!',
      firstName: 'default',
      lastName: 'admin'
    }, function (err, admin) {
      // console.log(err.details.messages)
      if (err) throw err;
      console.log('created admin account')
      Role.create({
        name: 'admin'
      }, function (err, role) {
        console.log('created role')
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: admin.id
        }, function (err, principal) {
          if (err) throw err;
          console.log('created principal');
        })
      })
    })
  })
};
