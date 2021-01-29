const evaluate = require('./evaluate');

// 3
const result = evaluate(`
(
  (let x 100)
  (let y (+ 3 4))
  (
  car
    (cons
      (/ y x)
      (+ 1 1 x)
    )
  )
)
`);

console.log(result);
