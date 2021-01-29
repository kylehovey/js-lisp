const { test } = require('./lib');
const lisp = require('../evaluate');

test("Set").expect(
  lisp`(
    (set x 100)
    x
  )`
).toBe(100);
