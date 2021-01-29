const lisp = require('../');
const { test } = require('./lib');

test("Add").expect(
  lisp`(
    (+ 3 9)
  )`
).toBe(12);

test("Subtract").expect(
  lisp`(
    (- 3 9)
  )`
).toBe(-6);

test("Multiply").expect(
  lisp`(
    (* 3 9)
  )`
).toBe(27);

test("Divide").expect(
  lisp`(
    (/ 3 6)
  )`
).toBe(0.5);

test("Compose").expect(
  lisp`(
    (+
      (+ 3 9)
      (- 3 9)
      (* 3 9)
      (/ 3 6)
    )
  )`
).toBe(33.5);
