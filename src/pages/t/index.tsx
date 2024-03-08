import React, { useState } from 'react'
import './index.css'

// 拖拽的侧边栏
export default function ResizeLayout() {
  const [siderWidth, setSiderWidth] = useState(
    Number.parseInt(localStorage.getItem('siderWidth')) || 150,
  )
  const [dragging, setDragging] = useState(false)
  const [startPageX, setStartPageX] = useState(0)
  const pxWidth = `${siderWidth}px`
  const handleMouseDown = (event) => {
    setStartPageX(event.pageX)
    setDragging(true)
  }
  const handleMouseMove = (event) => {
    const currentSiderWidth = siderWidth + event.pageX - startPageX
    if (currentSiderWidth < 150)
      return
    setSiderWidth(currentSiderWidth)
    setStartPageX(event.pageX)
  }
  const handleMouseUp = () => {
    setDragging(false)
    localStorage.setItem('siderWidth', siderWidth)
  }

  return (
    <div className="layout" style={{ paddingLeft: pxWidth }}>
      <div className="sider" style={{ width: pxWidth }}>
        sider
      </div>
      {/* <div className="header">header</div> */}
      <div className="content">content</div>
      <div
        className="sider-resizer"
        style={{ left: pxWidth }}
        onMouseDown={handleMouseDown}
      >
        {dragging && (
          <div
            className="resize-mask"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}
      </div>
    </div>
  )
}
