const parse = require('./parse');

const evaluate = (shard) => {
  if (shard.__class === 'atom') return shard;

  if (shard.__class === 'meta') {
    if (shard.__type === 'operator') return shard;

    if (shard.__type === 'variable') {
      throw new Error('Not implemented');
    }
  }

  if (shard.__class === 'structure') {
    if (shard.__type === 'expression') {
      const [ first, ...rest ] = shard.nodes;

      const { apply } = first.__type === 'operator' ?  first : (
        () => {
          const evaluated = evaluate(first);

          if (evaluated.__type !== 'operator') throw new Error(
            `Cannot use ${evaluated.__type} as an operator`
          );

          return evaluated;
        }
      )();

      return apply(...rest.map(evaluate));
    }
  }
};

module.exports = program => {
  const ast = parse(program);

  return evaluate(ast).value;
};
