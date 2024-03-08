import { useRef } from 'react'
import { useClipboard } from '~/hooks'

export default function App() {
  const { text, onCopy, isCopied } = useClipboard({ value: '' })
  const ref = useRef()

  const handleClick = () => {
    onCopy(ref?.current?.value)
  }

  return (
    <div>
      <input ref={ref} />
      <button onClick={handleClick}>复制</button>
      {
        isCopied ? `当前copy的值是${text}` : ''
      }
    </div>
  )
}
