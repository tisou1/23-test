import { isDraftable } from './utils'
import { createProxy } from './proxy'
import { finalize } from './finalize'

export function produce(base, recipe) {
  if (isDraftable(base)) {
    const proxy = createProxy(base)
    console.log(proxy)
    recipe(proxy)
    return finalize(proxy)
  }
  else {
    return recipe(base)
  }
}
