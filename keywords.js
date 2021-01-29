const types = require('./types');

module.exports = {
  cons: (a, b) => types.cons({ value: [a,b] }),
  car: ({ __type, value }) => {
    if (__type !== 'cons') {
      throw new Error('Tried to car without a cons');
    }

    const [a] = value;

    return a;
  },
  cdr: ({ __type, value }) => {
    if (__type !== 'cons') {
      throw new Error('Tried to cdr without a cons');
    }

    const [,b] = value;

    return b;
  },
  print: ({ value }) => {
    console.log(value);

    return types.void();
  },
  lambda: () => {
    throw new Error('Unimplemented');
  },
  eq: ({ __class: ac, value: a }, { __class: bc, value: b }) => {
    if (ac !== 'atom' || bc !== 'atom') {
      throw new Error(`Cannot compare ${ac} and ${bc}`);
    }

    return types.boolean({ value: a === b });
  },
  ['+']: (...args) => types.number({
    value: args.reduce(
      (acc, { __type, value }) => {
        if (__type !== 'number') {
          throw new Error(`Can't add ${__type}`);
        }

        return acc + value;
      },
      0,
    )
  }),
  ['-']: ({ __type, value }, ...rest) => {
    if (__type !== 'number') {
      throw new Error(`Can't subtract from ${__type}`);
    }

    const result = rest.reduce(
      (acc, { __type, value }) => {
        if (__type !== 'number') {
          throw new Error(`Can't subtract ${__type}`);
        }

        return acc - value;
      },
      first,
    );

    return types.number({ value: result });
  },
  ['*']: (...args) => types.number({
    value: args.reduce(
      (acc, { __type, value }) => {
        if (__type !== 'number') {
          throw new Error(`Can't multiply ${__type}`);
        }

        return acc * value;
      },
      0,
    ),
  }),
  ['/']: ({ __type, value }, ...rest) => {
    if (__type !== 'number') {
      throw new Error(`Can't divide ${__type}`);
    }

    const result = rest.reduce(
      (acc, { __type, value }) => {
        if (__type !== 'number') {
          throw new Error(`Can't divide with ${__type}`);
        }

        return acc / value;
      },
      value,
    );

    return types.number({ value: result });
  },
};
