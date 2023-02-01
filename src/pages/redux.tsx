import { useDispatch, useSelector } from 'react-redux'

export default (props) => {
  const store = useSelector(store => store)
  const dispatch = useDispatch()

  console.log(store)
  return (
    <div>
      <button onClick={() => dispatch({ type: '+' })}>+</button>
      <button onClick={() => dispatch({ type: '-' })}>-</button>
      <button onClick={() => dispatch({ type: 'todo' })}>todo</button>
    </div>
  )
}
