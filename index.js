'use strict';
const raven = require('raven');

module.exports.log = function(options, tags, message) {
  raven.config(options.dsn, options.client);
  const tagsObj = tags.reduce((obj, t) => {
    obj[t] = true;
    return obj;
  }, {});
  raven.captureMessage(message, {
    tags: tagsObj,
    extra: options.extra
  });
};
