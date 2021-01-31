const lisp = require('../');
const { test } = require('./lib');

test("Symbol equality").expect(
  lisp`(
    (eq 'sym 'sym)
  )`
).toBe(true);
