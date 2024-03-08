import type { MouseEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

/**
 *
 * @param props
 * @returns
 * 可拖拽实验-主要使用绝对布局
 */

function Workbench(props: any) {
  // parseInt(localStorage.getItem('siderWidth') as string) ||
  const [siderWidth, setSiderWidth] = useState(
    549,
  )
  const [dragging, setDragging] = useState(false)
  const [moving, setMoving] = useState(false)
  const [startPageX, setStartPageX] = useState(0)

  // 父元素宽高
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const ref = useRef(null)
  const pxWidth = `${siderWidth}px`

  const handleMouseDown = (event: MouseEvent) => {
    setStartPageX(event.pageX)
    setDragging(true)
  }
  // 实时更新位置
  const handleMouseMove = (event: MouseEvent) => {
    const currentSiderWidth = siderWidth + event.pageX - startPageX
    if (currentSiderWidth < 549) {
      setDragging(false)
      return
    }
    setSiderWidth(currentSiderWidth)
    setStartPageX(event.pageX)
  }
  const handleMouseUp = () => {
    console.log('mouseup')
    setDragging(false)
    localStorage.setItem('siderWidth', siderWidth)
  }

  const handleMouseLeave = () => {
    console.log('leave')
    setDragging(false)
  }
  useEffect(() => {
    setHeight(ref.current.offsetHeight)
    setWidth(ref.current.offsetWidth)
  }, [])

  // siderWidth % width * 100
  const leftN = Number.parseFloat(siderWidth / width).toFixed(4)
  const leftPercent = leftN * 100
  const rightPercent = (1 - leftN) * 100

  // console.log(leftN, leftPercent, rightPercent, dragging)
  // console.log(dragging, moving)

  return (
    <div style={{ width: 800, height: 600 }}>
      <div className="main" style={{ height: '100vh' }}>
        <div className="workbench-root" ref={ref}>
          <div
            className="workbench-card"
            onMouseLeave={handleMouseLeave}
          >
            <div

              className="workbench-card-left card-item"
              style={{ inset: `0% ${rightPercent}% 0% 0%` }}
            >
              left
            </div>
            <div
              className="mosaic-split row"
              style={{ inset: `0% 0% 0% ${leftPercent}%` }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <div
                className="mosaic-split-line"
              />
            </div>
            <div
              className="workbench-card-right card-item"
              style={{ inset: `0% 0% 0% ${leftPercent}%` }}
            >
            </div>
            <div
              onMouseMove={handleMouseMove}
              style={{ position: 'absolute', inset: '0px', zIndex: 90, backgroundColor: 'red', display: dragging ? 'block' : 'none' }}
            >
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Workbench
