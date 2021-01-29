const lisp = require('../');
const { test } = require('./lib');

test("Equality").expect(
  lisp`(
    (eq "Hello" "Hello")
  )`
).toBe(true);

test("Branching").expect(
  lisp`(
    (if (eq 33 (+ 30 3))
      "whenTrue"
      "whenFalse")
  )`
).toBe("whenTrue");

test("Short-Circuit").expect(
  lisp`(
    (if (eq 33 (+ 30 3))
      (set x 100)
      (set x 33))
    x
  )`
).toBe(100);
