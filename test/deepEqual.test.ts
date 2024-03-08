import { expect, it } from 'vitest'

export default function deepEqual(x: any, y: any): boolean {
  // @ts-expect-error
  return x && y && typeof x === 'object' && typeof y === 'object'
    ? Object.keys(x).length === Object.keys(y).length
    // @ts-expect-error
    && Object.keys(x).reduce((isEqual, key) => isEqual && deepEqual(x[key], y[key]), true)
    : x === y
}

it('deepEqual', () => {
  const a = 1
  const b = 1
  const obj = {
    cc: 'c',
    bb: {
      kl: 2,
    },
  }
  const obj2 = obj
  expect(deepEqual(a, b)).toBe(true)
  expect(deepEqual(obj, obj2)).toBe(true)
})
