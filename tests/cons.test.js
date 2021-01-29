const lisp = require('../');
const { test } = require('./lib');

test("car a cons").expect(
  lisp`(
    (set structure (cons
      "Hello"
      (cons "World" "!")))
    (car structure)
  )`
).toBe("Hello");

test("cdr a cons").expect(
  lisp`(
    (set structure (cons
      "Hello"
      "World"))
    (cdr structure)
  )`
).toBe("World");

test("cddr a cons").expect(
  lisp`(
    (set structure (cons
      "Hello"
      (cons "World" "!")))
    (cdr (cdr structure))
  )`
).toBe("!");
