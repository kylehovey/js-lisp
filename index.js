const lisp = require('./evaluate');

lisp`(
  (set fib (lambda x
    (if (eq x 0)
      1
      (if (eq x 1)
        1
        (+
          (fib (- x 1))
          (fib (- x 2)))))))
  (print (fib 10))
)`;
