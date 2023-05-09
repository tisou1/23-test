import React, { useEffect } from 'react'

function Sse() {
  useEffect(() => {
    // 建立sse连接
    const eventSource = new EventSource('http://localhost:3010/events', {
      withCredentials: false,
    })
    eventSource.addEventListener('customEvent', (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
    })

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      console.log(data, 'message')
    })

    eventSource.addEventListener('open', () => {
      console.log('服务已连接...')
    })

    eventSource.addEventListener('error', () => {
      console.log('服务连接出错...')
    })

    return () => {
      // 断开连接
      eventSource.close()
    }
  }, [])
  return (
    <div>Sse</div>
  )
}

export default Sse
