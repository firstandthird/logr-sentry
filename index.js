'use strict';
const raven = require('raven');

module.exports.log = function(options, tags, message) {
  raven.config(options.dsn, options.client);
  const baseTags = options.tags ? Object.assign({}, options.tags) : {};
  const tagsObj = tags.reduce((obj, t) => {
    obj[t] = true;
    return obj;
  }, baseTags);
  let level = 'info';
  if (tagsObj.error) {
    level = 'error';
    delete tagsObj.error;
  }
  if (tagsObj.warning) {
    level = 'warning';
    delete tagsObj.warning;
  }
  raven.captureMessage(message, {
    level,
    tags: tagsObj,
    extra: options.extra
  });
};
