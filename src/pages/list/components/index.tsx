import React, { useState } from 'react'
import { flushSync } from 'react-dom'

export function FixedSizeList(props) {
  const { width, height, itemCount, itemSize, children } = props

  // 滚动的距离
  const [scrollTop, setScrollTop] = useState(0)

  const RenderProps = children

  // 内容总高度
  const contentHeight = itemCount * itemSize

  // 继续要渲染的item索引有哪些
  let startIdx = Math.floor(scrollTop / itemSize)
  let endIdx = Math.floor((scrollTop + height) / itemSize)

  const paddingCount = 2
  startIdx = Math.max(startIdx - paddingCount, 0)
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1)

  // 第一个渲染元素距离顶部的距离
  const top = itemSize * startIdx
  console.log(startIdx)
  // 需要渲染的items
  const items = []
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <RenderProps key={i} index={i} style={{ height: itemSize }} />,
    )
  }

  return (
    <div
      style={{ height, overflow: 'auto' }}
      onScroll={(e) => {
      // 处理渲染异步导致的空白现象
      // 改为同步更新，但可能会有性能问题，可以做 节流 + RAF 优化
        flushSync(() => {
          setScrollTop(e.target.scrollTop)
        })
      }}
    >
      <div style={{ height: contentHeight }}>
        {/* 一个将 items 往下推到正确位置的空元素 */}
        <div style={{ height: top }}></div>
        {items}
      </div>
    </div>
  )
}
