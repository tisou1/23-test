import { it } from 'vitest'

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

const targetMap = new WeakMap()
let activeEffect

function trackEffects(dep) {
  if (!dep.has(activeEffect))
    dep.add(activeEffect)
    // TODO
    // activeEffect.deps.push(dep)
}

function triggerEffects(dep) {
  for (const effect of dep)

    effect()
    // if (effect.schedule)
    //   effect.schedule()

  // else
  //   effect.run()
}

function track(target, type, propsKey) {
  console.log(`触发 track -> target: ${target} type:${type} key:${propsKey}`)

  let depsMaps = targetMap.get(target)
  if (!depsMaps) {
    depsMaps = new Map()
    targetMap.set(target, depsMaps)
  }

  // name , age
  let dep = depsMaps.get(propsKey)
  if (!dep) {
    dep = new Set()
    depsMaps.set(propsKey, dep)
  }

  // trackEffect() TODO
  trackEffects(dep)
}

function trigger(target, type, propsKey) {
  console.log('trigger', target, type, propsKey)

  const deps = []
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return

  const dep = depsMap.get(propsKey)
  deps.push(dep)

  const effects: Array<any> = []
  deps.forEach((dep) => {
    // 这里解构 dep 得到的是 dep 内部存储的 effect
    effects.push(...dep)
  })

  triggerEffects(new Set(effects))
}

const handler = {
  get(target, propsKey, receiver) {
    const res = Reflect.get(target, propsKey, receiver)

    // 在触发 get 的时候进行依赖收集
    track(target, 'get', propsKey)

    if (isObject(res)) {
      // 将所有事object的属性也进行包裹,变成响应式
      return createReactiveObject(res, handler)
    }

    return res
  },
  set(target, propsKey, value, receiver) {
    const res = Reflect.set(target, propsKey, value, receiver)

    // 触发set的时候进行依赖响应, 比如更新数据,更新试图...
    trigger(target, 'set', propsKey)

    return res
  },
}

function createReactiveObject(target, handler) {
  const proxy = new Proxy(target, handler)

  return proxy
}

function effect(fn) {
  activeEffect = fn

  // 执行回调函数

  fn()
}

it('reative', () => {
  const obj = {
    name: 'siry',
    age: 18,
    numbers: [1, 2, 3],
    ob: {
      add: 'cccc',
      bd: 'ui09',
    },
  }

  const newProxy = createReactiveObject(obj, handler)

  effect(() => {
    console.log('effect', newProxy.name)
  })
})
