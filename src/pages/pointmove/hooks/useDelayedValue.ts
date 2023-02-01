import { useEffect, useState } from 'react'

const useDelayedValue: <T, D = number>(value: T, delay: D) => T
= (value, delay) => {
  const [delayedValue, setDelayedValue] = useState(value)
  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value)
    }, delay as number)
  }, [value, delay])

  return delayedValue
}

export default useDelayedValue
