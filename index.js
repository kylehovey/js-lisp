const evaluate = require('./evaluate');

const result = evaluate(`
(
  (let x 100)
  (let y (+ 3 4))
  (cdr
    (cons
      (/ y x)
      (cons
        (eq "test" "test")
        '?
      )))
)
`);

console.log(result);
