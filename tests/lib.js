const test = label => ({
  expect: value => ({
    toBe: expected => {
      if (expected === value) {
        console.log(`${label} PASSED: ${expected} === ${value}`)
      } else {
        console.log(`${label} FAILED: ${expected} !== ${value}`)
      }
    },
  })
});

module.exports = { test };
