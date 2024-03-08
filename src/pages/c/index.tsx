import React, { useRef } from 'react'

function App() {
  const ref = useRef()

  return (
    <T wrappedComponentRef={ref} />
  )
}

export default App

class T extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render(): React.ReactNode {
    return (
      <div>T</div>
    )
  }
}
