const types = require('./types');
const lex = require('./lexer');
let globalContext = {};

const evaluate = (shard, context) => {
  if (shard.__class === 'atom') return shard;

  if (shard.__type === 'variable') {
    if (
      !(shard.identifier in globalContext) && !(shard.identifier in context)
    ) throw new Error(`${shard.identifier} not defined`);

    if (shard.identifier in globalContext) {
      return globalContext[shard.identifier];
    }

    return context[shard.identifier];
  }

  if (shard.__type === 'expression') {
    const [ first, ...rest ] = shard.nodes;

    if (first.__type === 'definition') {
      const [ second, third ] = rest;

      if (second.__type !== 'variable') throw new Error(`Cannot assign to ${second.__type}`);

      globalContext[second.identifier] = evaluate(third, context);

      return types.void();
    }

    if (first.__type === 'operator') {
      if (first.op === 'lambda') {
        return ({
          ...first.apply(...rest),
          closures: {...globalContext, ...context},
        });
      }

      if (first.op === 'if') {
        const [predicate, ifTrue, ifFalse] = rest;
        const winner = first.apply(
          evaluate(predicate, context),
          ifTrue,
          ifFalse,
        );

        return evaluate(winner, context);
      }

      return first.apply(...rest.map(_ => evaluate(_, context)));
    }

    const evaluated = evaluate(first, context);

    if (evaluated.__type === 'lambda') {
      const newScope = {};
      const bindingValues = rest.map(_ => evaluate(_, context));

      if (bindingValues.length !== evaluated.bindings.length) {
        throw new Error(`Expected ${evaluated.bindings.length} arguments`);
      }

      bindingValues.forEach((value, i) => {
        const variable = evaluated.bindings[i];

        if (variable.__type !== 'variable') {
          throw new Error(`Expected ${variable.__type} to be a variable`);
        }

        newScope[variable.identifier] = value;
      });

      return evaluate(evaluated.expression, {
        ...evaluated.closures,
        ...newScope,
      });
    }

    return (([last]) => last)(
      shard.nodes.map(_ => evaluate(_, context)).slice(-1)
    );
  }
};

module.exports = ([program]) => {
  globalContext = {};

  return evaluate(lex(program), {}).value;
};
