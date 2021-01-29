const lisp = require('./evaluate');

const result = lisp`(
  (let x (car (cons 100 100)))
  (let y (+ 3 4))
  (let result
    (car
      (cdr
        (cons
          (let z (/ y x))
          (cons
            (eq z 0.07)
            '?
          )))))
  (print result)
)`;
