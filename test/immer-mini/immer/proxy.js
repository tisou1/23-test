import { DRAFT_STATE, ProxyType } from './constants'
import { has, is, isDraftable, latest, markChanged, peek, prepareCopy } from './utils'

const objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state

    // 优先取 copy_
    const source = latest(state)
    // 判断源对象上是否存在这个key
    if (!has(source, prop))
      // return source.__proto__[prop]
      return Object.getPrototypeOf(source)[prop]

    // 获取真实的数据
    const value = source[prop]

    // 如果state.finalozed_为true,或者取出来的value是普通类型, 直接返回value

    if (!isDraftable(value))
      return value

    // 判断取出来的值是否被中间元素代理了
    if (!value[DRAFT_STATE]) {
      // 给state上浅拷贝一份copy_(从state的base_拷贝过去)
      prepareCopy(state)

      state.copy_[prop] = createProxy(value, state)

      return state.copy_[prop]
    }

    return value
  },
  set(state, prop, value) {
    // 判断节点有没有修改过
    // 节点没被修改过
    if (!state.modified_) {
      const current = peek(latest(state), prop)

      // 判断新旧值是否相等
      if (is(value, current)) {
        if (current !== undefined || has(state.base_, prop))
          return true
      }
      // 浅拷贝
      prepareCopy(state)
      // 修改该节点和父节点的modified_,全部为已标记
      markChanged(state)
    }

    if (is(value, state.copy_[prop])) {
      if (value !== undefined || has(state.copy_, prop))
        return true
    }

    // 新旧值不同,给copy_赋值

    state.copy_[prop] = value

    return true
  },
  has(state, prop) {
    return prop in latest(state)
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state))
  },
  deleteProperty(state, prop) {
    // 如果要删除的元素存在state.base_中
    if (
      peek(state.base_, prop) !== undefined
      || prop in state.base_
    ) {
      // 浅拷贝
      prepareCopy(state)
      // 修改modified_为true
      markChanged(state)
    }

    if (state.copy_)
      delete state.copy_[prop]

    return true
  },
}

export function createProxy(base, parent) {
  const isArray = Array.isArray(base)

  // 中间对象
  const state = {
    type_: isArray ? ProxyType.ProxyArray : ProxyType.ProxyObject,
    parent_: parent,
    modified_: false,
    base_: base,
    draft_: null,
    copy_: null,
    revoke_: null,
  }

  const { revoke, proxy } = Proxy.revocable(state, objectTraps)
  state.draft_ = proxy
  state.revoke_ = revoke

  return proxy
}
