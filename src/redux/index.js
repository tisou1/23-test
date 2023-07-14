export default function createStore(reducer, preloadState) {
  let currentState = preloadState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatch = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners)
      nextListeners = currentListeners.slice()
  }

  function getState() {
    if (isDispatch)
      throw new Error('正在dispatch')

    return currentState
  }

  function subscribe(listener) {
    if (typeof listener !== 'function')
      throw new Error('listener需要是一个函数')

    // 表示是否订阅
    let isSubscribe = true

    ensureCanMutateNextListeners()

    nextListeners.push(listener)

    return function unSubscribe() {
      if (!isSubscribe)
        return

      if (isDispatch)
        throw new Error('正在dispatch,无法取消')
      // 标识取消订阅了
      isSubscribe = false

      ensureCanMutateNextListeners()

      const idx = nextListeners.findIndex(v => v === listener)
      nextListeners.splice(idx, 1)
      currentListeners = null
    }
  }

  function dispatch(action) {
    if (isDispatch)
      throw new Error('正在dispatch,')

    try {
      isDispatch = true
      currentState = reducer(currentState, action)
    }
    finally {
      isDispatch = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
