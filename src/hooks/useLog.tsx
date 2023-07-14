/**
 * react实现自动pv/click(页面浏览量和点击数)的埋点hooks
 */

import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

export const logContext = createContext({})

export default function useLog() {
  const message = useContext(logContext)
  const listenDom = useRef<HTMLElement>(null)

  const reportMessage = useCallback((data, type) => {
    if (type === 'pv') {
      // 页面浏览量上报
      console.log('组件 pv 上报', message)
    }
    else if (type === 'click') {
      // 点击上报
      console.log('组件 click 上报', message, data)
    }
  }, [message])

  useEffect(() => {
    // 对传入的dom元素进行监听
    const handleClick = (e: MouseEvent) => {
      reportMessage(e.target, 'click')
    }

    if (listenDom.current) {
      // 监听dom点击事件
      listenDom.current.addEventListener('click', handleClick)
    }

    // 清除函数
    return () => {
      listenDom.current && listenDom.current?.removeEventListener('click', handleClick)
    }
  }, [])

  return [listenDom, reportMessage]
}
