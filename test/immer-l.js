function produce(baseState, recipe) {
  const nextState = {}

  // 复制baseState
  for (const key in baseState)
    nextState[key] = baseState[key]

  // 定义代理对象

  const proxy = new Proxy(nextState, {
    get(target, key) {
      if (isObject(target[key])) {
        // 循环代理
        return new Proxy(target[key], this)
      }

      return target[key]
    },
    set(target, key, value) {
      if (isObject(value))
        value = new Proxy(value, this)

      target[key] = value

      // recipe(nextState)

      return true
    },
  })

  recipe(proxy)

  return nextState
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

// export default preduce

const state = {
  count: 0,
  person: {
    name: 'Alice',
    age: 30,
  },
}

const nextState = produce(state, (draft) => {
  draft.count = 2
  draft.person.age--
})

console.log(state) // { count: 0, person: { name: 'Alice', age: 30 } }
console.log(nextState.person === state.person) // { count: 1, person: { name: 'Alice', age: 29 } }
