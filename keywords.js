const types = require('./types');

module.exports = {
  cons: (a, b) => types.cons({ value: [a,b] }),
  car: ({ __type, value }) => {
    if (__type !== 'cons') throw new Error('Tried to car without a cons');

    return (([a]) => a)(value);
  },
  cdr: ({ __type, value }) => {
    if (__type !== 'cons') throw new Error('Tried to cdr without a cons');

    return (([,b]) => b)(value);
  },
  print: ({ value }) => (console.log(value), types.void()),
  lambda: (...args) => types.lambda({
    bindings: args.slice(0, args.length - 1),
    expression: args.slice(-1)[0],
    value: '[lambda]',
  }),
  eq: ({ __class: ac, value: a }, { __class: bc, value: b }) => {
    if (ac !== 'atom' || bc !== 'atom') throw new Error(`Cannot compare ${ac} and ${bc}`);

    return types.boolean({ value: a === b });
  },
  if: ({ __type, value }, ifTrue, ifFalse) => {
    if (__type !== 'boolean') {
      throw new Error(`Attempting to branch on ${__type}`);
    }

    return value ? ifTrue : ifFalse;
  },
  ...[
    ['+', 'add', (a, b) => a + b, 0],
    ['*', 'multiply', (a, b) => a * b, 1],
  ].reduce((keywords, [op, name, apply, init]) => ({
    ...keywords,
    [op]: (...args) => types.number({
      value: args.reduce((acc, { __type, value }) => {
        if (__type !== 'number') throw new Error(`Can't ${name} ${__type}`);

        return apply(acc, value);
      }, init)
    }),
  }), {}),
  ...[
    ['-', 'subtract', (a, b) => a - b],
    ['/', 'divide', (a, b) => a / b]
  ].reduce((keywords, [op, name, apply]) => ({
    ...keywords,
    [op]: ({ __type, value: first }, ...rest) => {
      if (__type !== 'number') throw new Error(`Can't ${name} from ${__type}`);

      const result = rest.reduce((acc, { __type, value }) => {
        if (__type !== 'number') throw new Error(`Can't subtract ${__type}`);

        return apply(acc, value);
      }, first);

      return types.number({ value: result });
    },
  }), {}),
};
