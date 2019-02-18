'use strict';

module.exports = function ({ types, ignoredMethods }) {
  return function ContentChecker (req, res, next) {
    if (ignoredMethods.includes(req.method)) {
      return next()
    }
    const isValid = types.reduce((validatorBool, type) => {
      return validatorBool || req.is(type);
    }, false);
    if (isValid) {
      return next();
    }
    res.status(400).json({ message: 'Request must be json' })
  };
};
