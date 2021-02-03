# LISP in Javascript

A Pineapple Express snow storm knocked out the power to our town for a week, but my laptop had enough battery for me to kill some boredom writing this LISP interpreter. It is the first one I have ever written, and I had no internet for reference, so there may be some wonky stuff here. If you want to see how it is used, check out the `tests` directory.

Here is the factorial function implemented using a Y-combinator for anonymous recursion using my LISP:

```javascript
const lisp = require('../');

/**
 * Will print `24` (4!)
 */
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
  (print (fact 4))
)`
```

## TODO:
- [x] Implement Lambda
- [ ] Implement Lexical Scoping of defines in lambdas
- [x] Implement Lexical Scoping of lambda arguments
- [x] Implement Closures
- [ ] Handle Spaces in Strings
- [ ] Throw Strings Instead of Errors
* [x] Add Tests
