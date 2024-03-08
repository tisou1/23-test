import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Index() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const go = () => {
    if (value)
      navigate(`/hello/${encodeURIComponent(value)}`)
  }
  const onload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  useEffect(() => {
    fetch('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/obj')
      .then(res => res.json())
      .then((d) => {
        const data = d.data
        console.log(data)
        // console.log(Object.keys(data), Object.entries(data))
      })
  }, [])
  return (
    <div className="text-center">
      <p className="text-gray-400 dark:text-gray-200/50">输入你的花名:</p>
      <input
        type="text"
        className="p-2 outline-none active:outline-none border border-gray-200 dark:border-gray-700"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <div className="mt-3">
        <button className="btn" onClick={go}>go</button>
      </div>

    </div>
  )
}

export default Index
