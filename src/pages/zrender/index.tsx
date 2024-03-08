import React, { useEffect, useRef } from 'react'
import * as zrender from 'zrender'

// zrender尝试
export default function Index() {
  const containerDom = useRef(null)
  useEffect(() => {
    const zr = zrender.init(document.getElementById('main'))
    const circle = new zrender.Circle({
      shape: {
        cx: 150,
        cy: 50,
        r: 40,
      },
      style: {
        fill: 'none',
        stroke: '#F00',
      },
    })
    zr.add(circle)
  }, [])

  return (
    <div ref={containerDom} id="main" className="w-full h-200px"></div>
  )
}
