const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.url === '/') {
    res.end(JSON.stringify({
      data: 'Hello World',
    }))
  }
  else if (req.url === '/events') {
    // 建立sse连接
    res.writeHead(200, {
      'Content-type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })

    let id = 0

    const intervalId = setInterval(() => {
      res.write('event: customEvent\n')
      res.write(`id: ${id}\n`)
      res.write('retry: 30000\n')
      const data = {
        id,
        time: new Date().toISOString(),
      }
      res.write(`data: ${JSON.stringify(data)}\n\n`)
      id++
      console.log(data)
    }, 1000)

    req.on('close', () => {
      clearInterval(intervalId)
      id = 0
      res.end()
    })
  }
}).listen(3010)

console.log('服务启动在: localhost:3010')
