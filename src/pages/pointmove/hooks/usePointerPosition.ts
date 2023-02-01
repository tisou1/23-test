import { useEffect, useState } from 'react'

interface Point {
  x: number
  y: number
}

const usePointerPosition: () => Point = () => {
  const [point, setPoint] = useState<Point>({ x: 0, y: 0 })

  useEffect(() => {
    // 这里使用的是原生的事件监听方式, 所以不用React.PointerEvent 事件类型
    function handleMove(e: PointerEvent) {
      setPoint({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('pointermove', handleMove)

    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return point
}

export default usePointerPosition
