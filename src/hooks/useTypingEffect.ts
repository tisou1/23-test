import { useEffect, useState } from 'react'

export default function useTypingEffect(
  text: string,
  duration: number = 1000,
  isTypeByLetter: boolean = false,
) {
  const [currentPosition, setCurrentPosition] = useState(0)
  const items = isTypeByLetter ? text.split('') : text.split(' ')

  useEffect(() => {
    setCurrentPosition(0)
  }, [text])

  useEffect(() => {
    if (currentPosition >= items.length)
      return

    const intervalID = setInterval(() => {
      setCurrentPosition(prevPosition => prevPosition + 1)
    }, duration)

    return () => {
      clearInterval(intervalID)
    }
  }, [text, duration, currentPosition])

  return items.slice(0, currentPosition).join(isTypeByLetter ? '' : ' ')
}
