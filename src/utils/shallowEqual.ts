export default function shallowEqual<T>(obj1: T & object, obj2: T & object): boolean {
  // 接受两个泛型参数 T，这意味着它可以接受任何类型的参数

  // 1.  is比较
  if (Object.is(obj1, obj2))
    return true

  // 2. 对象和数组
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null)
    return false

  // 3. 长度
  const keysA = Object.keys(obj1)
  const keysB = Object.keys(obj1)

  if (keysA.length !== keysB.length)
    return false

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(obj2, keysA[i])
      || !Object.is(obj1[keysA[i]], obj2[keysB[i]])
    )
      return false
  }

  return true
}
