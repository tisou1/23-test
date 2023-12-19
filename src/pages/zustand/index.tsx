import {create} from '~/zustand'

const useCountState = create((set,get) => (
  {
    count: 0,
    updateCount: (value) => set(() => ({count: value})),
    updateCount1: () => set(() => {
      console.log(get())
      return {count: get().count + 1}
    })
  }
))

export default function App() {
  const count  = useCountState(state => state.count);
  const updateCount = useCountState(state => state.updateCount);
  const  updateCount1 = useCountState(state => state.updateCount1);


  return (
    <div>
      {count}
      <button onClick={() => updateCount(2)}>+</button>
      <button onClick={() => updateCount1()}>+</button>
    </div>
  )
}