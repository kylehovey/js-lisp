const lisp = require('../');
const { test } = require('./lib');

test("Set").expect(
  lisp`(
    (set x 100)
    x
  )`
).toBe(100);
