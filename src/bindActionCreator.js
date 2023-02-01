function bindActionCreator(actionCreator, dispatch) {
  return function (this, ...args) {
    dispatch(actionCreator.apply(this, args))
  }
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function')
    return bindActionCreator(actionCreators, dispatch)

  if (typeof actionCreators !== 'object' || typeof actionCreators === null)
    throw new Errow('类型传递错误')

  const boundActionCreators = {}
  for (key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function')
      return bindActionCreator(actionCreator, dispatch)
  }

  return boundActionCreators
}
