const keywords = require('./keywords');

module.exports = expr => {
  if (/^\d*$/.test(expr)) return {
    __type: 'number',
    __class: 'atom',
    value: parseFloat(expr),
  };

  if (/^".*"$/.test(expr)) return {
    __type: 'string',
    __class: 'atom',
    value: parseFloat(expr),
  };

  if (/^'.*$/.test(expr)) return {
    __type: 'symbol',
    __class: 'atom',
    value: expr,
  };

  if (expr in keywords) return {
    __type: 'operator',
    __class: 'meta',
    op: expr,
    apply: keywords[expr],
  };

  return {
    __type: 'variable',
    __class: 'meta',
    reference: expr,
  };
};
