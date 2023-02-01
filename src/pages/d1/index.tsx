import type { MouseEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

/**
 *
 * @param props
 * @returns
 * 可拖拽实验-主要使用flex布局
 */

function Workbench(props: any) {
  const [show, setShow] = useState(false)
  // parseInt(localStorage.getItem('siderWidth') as string) ||
  const [siderWidth, setSiderWidth] = useState(
    595,
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
    const curParentWidth = ref?.current.offsetHeight
    const currentSiderWidth = siderWidth + event.pageX - startPageX
    if (currentSiderWidth < 594 || curParentWidth - currentSiderWidth < 594) {
      setDragging(false)
      return
    }
    setSiderWidth(currentSiderWidth)
    setStartPageX(event.pageX)
  }
  const handleMouseUp = () => {
    setDragging(false)
    localStorage.setItem('siderWidth', siderWidth)
  }

  const handleMouseLeave = () => {
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
    <div >
      <div className="main" >
        <div className="workbench-root" ref={ref}>
          <div
            className="workbench-card"
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="workbench-card-left card-item"
              style={{ width: siderWidth }}
            >
              <div className="left-content" />
            </div>
            <div
              className="mosaic-split row"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <div
                className="mosaic-split-line"
              />
            </div>
            <div
              ref={ref}
              className="workbench-card-right card-item"
            >
              <div className="left-content" />
            </div>
            <div
              onMouseMove={handleMouseMove}
              style={{ position: 'absolute', inset: '0px', zIndex: 90, backgroundColor: 'red', display: dragging ? 'block' : 'none' }}></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Workbench

function P() {
  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illo aspernatur iusto amet. Quas id quo hic dolorem, ullam corrupti quibusdam, debitis voluptate et eligendi minima deleniti nam, quia tenetur?</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius iure soluta, neque ab, asperiores voluptatibus totam rerum fugiat aspernatur tempora optio! Possimus corrupti suscipit odio laboriosam amet id sint commodi.</p>

    </div>
  )
}
