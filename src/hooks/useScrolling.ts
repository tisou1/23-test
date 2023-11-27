import { useEffect, useState } from 'react'

export default function useScrolling() {
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    let scrollingTimeout: NodeJS.Timeout

    const handleScrollEnd = () => {
      setScrolling(false)
    }
    // 处理滚动事件的回调函数
    const handleScroll = () => {
      setScrolling(true)
      // 延迟一个时间
      clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => handleScrollEnd(), 150)
    }

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll)

    // 在组件卸载时移除滚动事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // 依赖项为空数组表示仅在组件挂载和卸载时执行

  return scrolling
}
