import { expect, it } from 'vitest'
import { firstArray, isSort } from '.'

it('isSorted', () => {
  const a = [1, 2, 3]
  const b = [5, 3, 1]
  // 升序
  expect(isSort(a)).toBe(true)
  expect(isSort(b)).toBe(false)
  // 降序
  expect(isSort(b, (x, y) => y - x)).toBe(true)
})

it('firstArray', () => {
  const a = [1, 2, 3]

  expect(firstArray(a)).toEqual(1)
  expect(firstArray(a, 3)).toEqual([1, 2, 3])
  expect(firstArray(a, 5)).toEqual([1, 2, 3])
})
