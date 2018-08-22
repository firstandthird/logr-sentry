'use strict';
const raven = require('raven');

module.exports.log = function(options, tags, message) {
  raven.config(options.dsn, {
    name: options.name,
    release: options.release,
    environment: options.environment,
    logger: options.logger || 'logr',
    tags: options.tags,
    extra: options.extra
  });

  const tagsObj = tags.reduce((obj, t) => {
    obj[t] = true;
    return obj;
  }, {});

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
    tags: tagsObj
  });
};
