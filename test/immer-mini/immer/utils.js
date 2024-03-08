import { DRAFT_STATE } from './constants'

export function isDraftable(value) {
  //  // +0, -0, 0, null, undefined, '', NaN, false
  if (!value)
    return false

  if (value[DRAFT_STATE])
    return false

  // 判断是否是普通对象或者数组
  // if (value.__proto__ === Object.prototype || Array.isArray(value))
  //   return true

  if (isObject(value) || Array.isArray(value))
    return true

  return false
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}

/**
 *
 * @param {} state
 * 如果sttae存在copy_,则返回,否则返回base_
 */
export function latest(state) {
  return state.copy_ || state.base_
}

export function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

// 为state附上copy_属性
export function prepareCopy(state) {
  if (!state.copy_) {
    if (Array.isArray(state.base_))
      state.copy_ = [...state.base_]

    else
      state.copy_ = { ...state.base_ }
  }
}

export function peek(draft, prop) {
  // 判断传入的state是否被中间对象代理
  const state = draft[DRAFT_STATE]

  // 被代理过,返回copy_上的prop
  if (state)
    return latest(state)[prop]

  else
    return draft[prop]
}
/**
 *
 * @param {} state
 * 标记节点及其父节点为已修改
 */
export function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true
    if (state.parent_)
      markChanged(state.parent_)
  }
}

export function is(x, y) {
  if (x === y) {
    if (x !== 0)
      return true

    else
      return 1 / x === 1 / y
  }
  // NaN 与NaN不相等
  else {
    // eslint-disable-next-line no-self-compare
    return x !== x && y !== y
  }
}
