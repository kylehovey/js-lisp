const types = require('./types');
const atomize = require('./atomize');

const given = (bind => expr => ({
  value: expr,
  ...bind(expr)`map`(f => x => x.map(f)),
  ...bind(expr)`without`(char => x => x.filter(expr => expr !== char)),
  ...bind(expr)`extricate`(re => x => x.map(expr => expr.replace(re, ''))),
  ...bind(expr)`splitAround`(char => x => x
    .map(str => str.split(char).reduce((acc, shard) => [
        ...acc,
        ...acc.length ? [char] : [],
        shard,
      ],
      []))
    .reduce((acc, split) => [...acc, ...split])
    .filter(expr => expr.length !== 0)
  ),
}))(x => ([method]) => f => ({
  [method]: a => given(f(a)((Array.isArray(x) ? x : [x]))),
}));

const delineate = expression => given(expression)
  .splitAround('(').splitAround(')')
  .splitAround(' ').without(' ')
  .extricate(/\s/g).without('')
  .value;

module.exports = (string) => {
  const exprs = delineate(string);
  const stack = [];
  const root = types.expression({ nodes: [] });

  let cursor = root;

  for (let i = 0; i < exprs.length; ++i) {
    const expr = exprs[i];

    if (expr === '(') {
      stack.push(cursor);
      cursor.nodes.push(cursor = types.expression({ nodes: [] }));
    } else if (expr === ')') {
      cursor = stack.pop();
    } else {
      cursor.nodes.push(atomize(expr));
    }
  }

  return (([ast]) => ast)(root.nodes);
};
