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
          environment: 'test',
          logger: 'logr-test',
          tags: {
            env: 'production'
          },
          extra: {
            blah: 'test'
          }
        }
      }
    }
  });
  log(['error', 'taga', 'tagb'], { message: 'this is an error', some: 'error' });
  log(['warning', 'taga', 'tagb'], { message: 'this is a warning', some: 'warning' });
  log(['taga', 'tagb'], { some: 'info' });
  log(['taga', 'tagb'], 'some string');
  t.end();
});

