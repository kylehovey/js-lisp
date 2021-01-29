const lisp = require('./evaluate');

const result = lisp`(
  (set x (car (cons 100 100)))
  (set y (+ 3 4))
  (set result
    (car
      (cdr
        (cons
          (set z (/ y x))
          (cons
            (eq z 0.07)
            '?
          )))))
  (print result)
)`;
