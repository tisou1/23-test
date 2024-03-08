function defaultComparator(a, b) {
  return a - b
}

/**
 *
 * @param {Array<T>} array
 * @param {<T>(a: T, b: T) => boolean} comparator
 * @returns
 */
export function isSort(array, comparator = defaultComparator) {
  if (!Array.isArray(array))
    throw new TypeError(`ExpectEd Array, but got ${typeof array}`)

  for (let i = 0, length = array.length; i < length; i++) {
    if (comparator(array[i], array[i + 1]) > 0)
      return false
  }

  return true
}

/**
 *
 * @param {Array<T>} array
 * @param {number} num
 * @returns {Array<T> | undefined}
 */
export function firstArray(array, num = 1) {
  if (!Array.isArray(array))
    throw new TypeError(`ExpectEd Array, but got ${typeof array}`)

  const isNumber = typeof num === 'number'

  const len = array.length
  if (len < num)
    num = len

  const res = array.slice(0, !isNumber ? 1 : num)

  if (num === 1)
    return res[0]

  return res
}
