import { useSyncExternalStore } from 'react'

function createStore(createState) {
  let state: unknown
  const listeners = new Set<(pre: unknown, next: unknown) => void>()

  const getState = () => state

  const setState = (partial: (state: any) => any, replace: boolean) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      if (!replace) {
        // 合并state
        state = (typeof nextState !== 'object' || nextState === null)
          ? nextState
          : Object.assign({}, state, nextState)
      }
      else {
        state = nextState
      }
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const destory = () => listeners.clear()

  const api = { setState, getState, subscribe, destory }

  state = createState(setState, getState, api)

  return api
}

// function useStore(api, selector) {
//   const [, forceRender] = useState(0);
//   useEffect(() => {
//     api.subscribe((state, prevState) => {
//       const newObj = selector(state)
//       const oldObj = selector(prevState)

//       if(newObj !== oldObj) {
//         forceRender(Math.random())
//       }
//     })
//   },[])

//   return selector(api.getState);
// }

function useStore(api, selector) {
  function getState() {
    return selector(api.getState())
  }

  return useSyncExternalStore(api.subscribe, getState)
}

export function create(createState) {
  const api = createStore(createState)

  const useBoundStore = selector => useStore(api, selector)

  Object.assign(useBoundStore, api)

  return useBoundStore
}
