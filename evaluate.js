const types = require('./types');
const lex = require('./lexer');
let context = {};

const evaluate = (shard) => {
  if (shard.__class === 'atom') return shard;

  if (shard.__type === 'variable') {
    if (shard.identifier in context) {
      return context[shard.identifier];
    } else {
      throw new Error(
        `Variable ${shard.identifier} not defined`
      );
    }
  }

  if (shard.__type === 'expression') {
    const [ first, ...rest ] = shard.nodes;
    const evaluated = evaluate(first);

    if (evaluated.__type === 'definition') {
      const [ second, third ] = rest;

      if (second.__type !== 'variable') throw new Error(
        `Cannot assign to ${second.__type}`
      );

      return context[second.identifier] = evaluate(third);
    }

    const rhs = rest.map(evaluate);

    if (evaluated.__type === 'operator') {
      return evaluated.apply(...rhs);
    } else {
      const [last] = rhs.slice(-1);

      return last;
    }
  }
};

module.exports = ([program]) => {
  const ast = lex(program);
  context = {};

  return evaluate(ast).value;
};
