const keywords = require('./keywords');

module.exports = expr => {
  if (/^\d*$/.test(expr)) return {
    __class: 'atom',
    __type: 'number',
    value: parseFloat(expr),
  };

  if (/^".*"$/.test(expr)) return {
    __class: 'atom',
    __type: 'string',
    value: parseFloat(expr),
  };

  if (/^'.*$/.test(expr)) return {
    __class: 'atom',
    __type: 'symbol',
    value: expr.slice(1, expr.length),
  };

  if (expr in keywords) return {
    __class: 'atom',
    __type: 'operator',
    op: expr,
    apply: keywords[expr],
  };

  if (expr === 'let') return {
    __class: 'atom',
    __type: 'definition',
  }

  return {
    __class: 'reference',
    __type: 'variable',
    identifier: expr,
  };
};
