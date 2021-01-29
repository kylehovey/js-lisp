const lisp = require('../');
const { test } = require('./lib');

test("monadic lambda").expect(
  lisp`(
    (set f (lambda x (* x x)))
    (f 3)
  )`
).toBe(9);

test("dyadic lambda").expect(
  lisp`(
    (set f (lambda x y (+ x y)))
    (f 30 3)
  )`
).toBe(33);
