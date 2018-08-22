'use strict';
const raven = require('raven');

let configed = false;
module.exports.init = function(options) {
  raven.config(options.dsn, {
    name: options.name,
    release: options.release,
    environment: options.environment,
    logger: options.logger || 'logr',
    tags: options.tags,
    extra: options.extra
  });
  configed = true;
};

module.exports.log = function(options, tags, message) {
  //for backwards compat
  if (!configed) {
    module.exports.init(options);
  }

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
