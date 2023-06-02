import { expect, it } from 'vitest'
import add from './adder'

it('add', () => {
  expect(add(1, 2, 3)).toBe(6)
  expect(add(1)(2)(3)).toBe(6)
  expect(add(1, 2)(3)).toBe(6)
})
