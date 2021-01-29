const types = require('./types');
const keywords = require('./keywords');

module.exports = expr => {
  if (/^\d+(?:\.|)(?:\d+|)$/.test(expr)) return types.number({
    value: parseFloat(expr),
  });

  if (/^".*"$/.test(expr)) return types.string({
    value: expr.toString(),
  });

  if (/^'.*$/.test(expr)) return types.symbol({
    value: expr.slice(1, expr.length),
  });

  if (/^(?:true|false)$/.test(expr)) return types.boolean({
    value: expr === 'true',
  });

  if (expr in keywords) return types.operator({
    op: expr,
    apply: keywords[expr],
  });

  if (expr === 'let') return types.definition();

  return types.variable({ identifier: expr });
};
