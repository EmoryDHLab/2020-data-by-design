'use strict';

var server = require('../server');
var ds = server.dataSources.mysqlDs;
var lbTables = ['Reader'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in', ds.adapter.name);
  ds.disconnect();
});
