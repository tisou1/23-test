import { describe, expect, it } from 'vitest'

it('test', () => {
  const f1 = () => 1
  const f2 = () => 2
  const f3 = () => 3

  const fn = compose(f1, f2, f3)
  expect(fn()).toMatchInlineSnapshot('1')
})

function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args)),
  )
}
