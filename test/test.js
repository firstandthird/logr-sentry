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
  log(['error', 'taga', 'tagb'], { some: 'error' });
  log(['warning', 'taga', 'tagb'], { some: 'warning' });
  log(['taga', 'tagb'], { some: 'info' });
  t.end();
});

