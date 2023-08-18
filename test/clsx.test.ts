import { describe, expect, it } from 'vitest'
import clsx from './clsx'

describe('clsx测试', () => {
  it('普通字符串测试', () => {
    expect(clsx('bar foo ccc')).toBe('bar foo ccc')
  })

  it('数组测试', () => {
    expect(clsx(['bar', { foo: true, ccc: false }])).toBe('bar foo')
  })

  it('object测试', () => {
    expect(clsx({ bar: typeof 1 === 'number', foo: true, ccc: false })).toBe('bar foo')
  })
})
