export default function App() {
  function fc(fb: () => void) {
    console.log('fc')
    fb()
  }
  function fb() {
    return () => console.log('fb')
  }

  fc(fb())
  return (
    <div></div>
  )
}

// f1(f2(f3(dispatch)))
