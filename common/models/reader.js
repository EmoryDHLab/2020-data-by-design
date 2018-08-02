'use strict';

module.exports = function(Reader) {
  Reader.afterRemote('login', (ctx) => {
    ctx.res.cookie('access-token', ctx.result.id, {
      signed: true,
      maxAge: ctx.result.ttl * 1000,
      httpOnly: true
    });
    return Promise.resolve();
  });
  Reader.afterRemote('logout', (ctx) => {
    ctx.res.clearCookie('access-token');
    return Promise.resolve();
  });
};
