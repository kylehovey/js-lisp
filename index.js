const lisp = require('./evaluate');

lisp`(
  (set f (lambda a b (* a b)))
  (print (f 3 9))
)`;
