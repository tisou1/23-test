import { describe, expect, it } from 'vitest'
import shallowEqual from './shallowEqual'

describe('shallowEqual', async () => {
  it('shallowEqual', async () => {
    expect(shallowEqual({ a: 1, b: 'c' }, { a: 1, b: 'c' })).toBe(true)
    expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(shallowEqual(null, {})).toBe(false)
    expect(shallowEqual(null, null)).toBe(true)
    expect(shallowEqual(1, 1)).toBe(true)
  })
})
