const evaluate = require('./evaluate');

// 3
const result = evaluate(`
(car
  (cons
    (/ 3 2 2)
    (+ 1 1 1)
  )
)
`);

console.log(result);
