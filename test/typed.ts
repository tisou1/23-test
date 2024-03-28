/**
 * js类型判断工具
 */

// 在函数的返回值中，value 变量会被缩小为 symbol 类型。
export const  isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol
}

export const isArray =  Array.isArray

/**
 * 
 * @param value 
 * Primitive Types: number , string , boolean , symbol, bigint, undefined, null
 * 判断基本类型
 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  )
}

export const isFunction = (value: any): value is Function => {
  // return typeof value === 'function'
  return !!(value && value.constructor && value.call && value.apply)
}

export const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String
}

export const isInt = (value: any): value is number => {
  return isNumber(value) && value % 1 === 0
}

export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0
}


export const isNumber = (value: any): value is number => {
  try {
    // return typeof value === 'number'  //这种会把NaN也判断为number
    return Number(value) === value
  } catch {
    return false
  }
}

export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false
  if (!value.then) return false
  if (!isFunction(value.then)) return false
  // return  value instanceof Promise;
  return true
}


export const isEmpty = (value: any): boolean =>  {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return value === 0
  if (isDate(value)) return isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}

/**
 * 
 * @param x 
 * @param y 
 * @returns 
 * 不判断是否是引用相同, 结构相同即可
 */
export const isEqual = <T>(x: T, y: T):boolean =>  {
  if (Object.is(x, y)) return true
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }

  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  ) {
    return false
  }

  const keysX = Reflect.ownKeys(x as unknown as Object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length) return false
  for (let i = 0; i < keysX.length; i++ ) {
    if (!Reflect.has(y as unknown as Object, keysX[i])) return false
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false
  }  
  return true
}




