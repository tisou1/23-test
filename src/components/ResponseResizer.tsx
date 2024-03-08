import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import './index.less'

interface ResizerProps {
  leftCard?: ReactNode
  rightCard?: ReactNode
  hideRightCard?: boolean
  defaultLeftWidth?: number | string
  minLeftWidth?: number
  maxLeftWidth?: number
  minRightWidth?: number
  maxRightWidth?: number
  getToolbarWidth?: any
}

const ResponseResizer: React.FC<ResizerProps> = (props) => {
  const {
    leftCard = null,
    rightCard = null,
    hideRightCard = false,
    defaultLeftWidth,
    minLeftWidth = 220,
    maxLeftWidth,
    minRightWidth = 320,
    maxRightWidth,
    getToolbarWidth,
  } = props

  const [dragging, setDragging] = useState<boolean>(false)

  const refLeft: any = useRef()
  const refRight: any = useRef()
  const refBar: any = useRef()

  useEffect(() => {
    let startX: number
    let startWidthLeft: number
    let startWidthRight: number
    const start = (e: any) => {
      setDragging(true)
      startX = e.clientX
      startWidthLeft = Number.parseInt(getComputedStyle(refLeft?.current, null).width, 10)
      startWidthRight = Number.parseInt(getComputedStyle(refRight?.current, null).width, 10)
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', end)
    }

    const move = _.throttle((e) => {
      refLeft.current.style.width = `${startWidthLeft + e.clientX - startX}px`
      refRight.current.style.width = `${startWidthRight - (e.clientX - startX)}px`
      getToolbarWidth && getToolbarWidth(startWidthLeft + e.clientX - startX)
    }, 100)

    const end = () => {
      setDragging(false)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', end)
    }

    refBar?.current?.addEventListener('mousedown', start)

    return () => {
      refBar?.current?.removeEventListener('mousedown', start)
    }
  }, [])

  useEffect(() => {
    getToolbarWidth && getToolbarWidth(window.innerWidth - 220 - minRightWidth)
  }, [])

  if (!rightCard)
    return leftCard

  return (
    <div className="response-main">
      <div className="workbench-root">
        <div className="workbench-card" style={{ userSelect: dragging ? 'none' : 'inherit' }}>
          <div
            className="workbench-card-left card-item"
            style={{
              width: hideRightCard ? '100%' : defaultLeftWidth,
              minWidth: minLeftWidth,
              maxWidth: hideRightCard ? 'max-content' : maxLeftWidth,
            }}
            ref={refLeft}
          >
            {leftCard}
          </div>
          <div className={classNames('mosaic-split', 'row', { 'hide-right-card': hideRightCard })} ref={refBar}>
            <div className="mosaic-split-line" />
          </div>
          <div
            className="workbench-card-right card-item"
            ref={refRight}
            style={{
              minWidth: hideRightCard ? 0 : minRightWidth,
              maxWidth: maxRightWidth,
              display: hideRightCard ? 'none' : 'unset',
            }}
          >
            {rightCard}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponseResizer
