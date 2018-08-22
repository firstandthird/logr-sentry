'use strict';
const Logr = require('logr');
const logrSentry = require('../index.js');
const test = require('tap').test;

test('can load the plugin ', (t) => {
  const log = Logr.createLogger({
    reporters: {
      sentry: {
        reporter: logrSentry,
        options: {
          dsn: process.env.SENTRY_DSN,
          extra: {
            blah: 'test'
          }
        }
      }
    }
  });
  log(['taga', 'tagb'], { some: 'object' });
  t.end();
});

