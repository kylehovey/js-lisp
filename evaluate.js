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

      context[second.identifier] = evaluate(third);

      return types.void();
    }

    if (first.__type === 'operator') {
      if (first.op === 'lambda') {
        return first.apply(...rest);
      }

      return first.apply(...rest.map(evaluate));
    }

    const evaluated = evaluate(first);

    if (evaluated.__type === 'lambda') {
      const bindingValues = rest.map(evaluate);

      if (bindingValues.length !== evaluated.bindings.length) {
        throw new Error(`Expected ${evaluated.bindings.length} arguments`);
      }

      bindingValues.forEach((value, i) => {
        const variable = evaluated.bindings[i];

        if (variable.__type !== 'variable') {
          throw new Error(`Expected ${variable.__type} to be a variable`);
        }

        context[variable.identifier] = value;
      });

      return evaluate(evaluated.expression);
    }

    return (([last]) => last)(shard.nodes.map(evaluate).slice(-1));
  }
};

module.exports = ([program]) => {
  context = {};

  return evaluate(lex(program)).value;
};
