const types = require('./types');
const lex = require('./lexer');
let context = {};

const evaluate = shard => {
  if (shard.__class === 'atom') return shard;

  if (shard.__type === 'variable') {
    if (!(shard.identifier in context)) throw new Error(`${shard.identifier} not defined`);

    return context[shard.identifier];
  }

  if (shard.__type === 'expression') {
    const [ first, ...rest ] = shard.nodes;

    if (first.__type === 'definition') {
      const [ second, third ] = rest;

      if (second.__type !== 'variable') throw new Error(`Cannot assign to ${second.__type}`);

      return context[second.identifier] = evaluate(third);
    }

    if (first.__type === 'operator') return first.apply(...rest.map(evaluate));

    return (([last]) => last)(shard.nodes.map(evaluate).slice(-1));
  }
};

module.exports = ([program]) => {
  context = {};

  return evaluate(lex(program)).value;
};
