import { DRAFT_STATE, ProxyType } from './constants'

export function finalize(proxy) {
  const proxyState = proxy[DRAFT_STATE]
  console.log(proxyState, '>>>++++')

  if (proxyState) {
    // 被代理
    if (proxyState.modified_) {
      if (proxyState.type_ === ProxyType.ProxyArray) {
        for (const index in proxyState.copy_)
          proxyState.copy_[index] = finalize(proxyState.copy_[index])
      }
      else {
        Object.keys(proxyState.copy_).forEach((key) => {
          const value = proxyState.copy_[key]
          proxyState.copy_[key] = finalize(value)
        })
      }
    }

    // 解除代理
    proxyState.revoke_()

    return proxyState[proxyState.modified_ ? 'copy_' : 'base_']
  }
  else {
    return proxy
  }
}
