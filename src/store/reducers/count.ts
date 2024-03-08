import { combineReducers } from 'redux'
import type { ActionType } from '../type'

const initialState = {
  count: 0,
  todo: [],
}

function countReducer(state = initialState.count, action: ActionType) {
  switch (action.type) {
    case '+':
      return state + 1
    case '-':
      return state - 1
    default:
      return state
  }
}
function todoReducer(state = initialState.todo, action: ActionType) {
  switch (action.type) {
    case 'todo':
      return [...state, { name: 'siry' }]
    case '+':
      return [...state, { age: 22 }]
    default:
      return state
  }
}

const reducers = combineReducers({
  countReducer,
  todoReducer,
})

export default reducers
