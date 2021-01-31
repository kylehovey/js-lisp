const lisp = require('../');
const { test } = require('./lib');

test("y-combinator").expect(
  lisp`(
    (set M (lambda f (f f)))
    (set Y (lambda fn
      (M
        (lambda maker
          (lambda x
            ((fn (maker maker)) x))))))
    (set fact (Y
      (lambda self
        (lambda x
          (if (eq x 0)
            1
            (* x (self (- x 1))))))))
    (fact 4)
  )`
).toBe(24);
