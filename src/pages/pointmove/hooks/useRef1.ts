import { useState } from 'react'

interface RefP<T> {
  current: T
}
// react文档中的一部分
// 原则上useRef可以用useState实现的
function useRef1<T>(initialValue: T): RefP<T> {
  const [ref, _] = useState<RefP<T>>({ current: initialValue })

  return ref
}

export default useRef1
