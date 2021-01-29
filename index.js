const evaluate = require('./evaluate');

const result = evaluate(`
(
  (let x 100)
  (let y (+ 3 4))
  (car
    (cdr
      (cons
        (let z (/ y x))
        (cons
          (eq z 0.07)
          '?
        ))))
)
`);

console.log(result);
