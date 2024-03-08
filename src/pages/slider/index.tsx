import React, { useRef, useState } from 'react'

// 侧边栏展开收缩
function Slider() {
  const [width, setWidth] = useState(200)
  const handleClick = () => {
    setWidth(width === 0 ? 200 : 0)
    getWH()
  }

  const ref = useRef(null)
  const getWH = () => {
    const rect = ref.current.getBoundingClientRect()
    console.log(rect)
    console.log(ref.current.clientWidth)
    console.log(ref.current.offsetheight)
  }

  return (
    <div className="w-2000px flex">
      <div className="slider bg-yellow-500 w-200px h-100vh relative ease-linear duration-300" style={{ width }}>
        <div className="bg-blue w-60px h-60px absolute top-1/2 -right-60px cursor-pointer z-50" onClick={handleClick}></div>
      </div>
      <div className="main bg-red flex-1 h-100vh" ref={ref}></div>
    </div>
  )
}

export default Slider
