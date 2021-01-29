const lisp = require('../');
const { test } = require('./lib');

test("Fibonacci").expect(
  lisp`(
    (set fib (lambda x
      (if (eq x 0)
        1
        (if (eq x 1)
          1
          (+
            (fib (- x 1))
            (fib (- x 2)))))))
    (fib 10)
  )`
).toBe(89);
