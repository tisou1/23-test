import { useEffect, useState } from 'react'

function useKeyEvents(keyEvents) {
  const [keysPressed, setKeysPressed] = useState([])

  function downHandler({ key, metaKey, ctrlKey, altKey, shiftKey }) {
    const keys = [...keysPressed]

    // 检查组合键是否按下
    if (metaKey || ctrlKey || altKey || shiftKey) {
      // 如果已有的组合键数组中不包含新的组合键, 说明要添加组合键进数组
      if (!keys.includes('Meta') && !keys.includes('Control') && !keys.includes('Alt') && !keys.includes('Shift'))
        keys.push('Meta')
    }

    // 添加按下的键(c | v ......)
    if (!keys.includes(key))
      keys.push(key)

    // 更新状态
    setKeysPressed(keys)
  }

  function upHandler({ key, metaKey, ctrlKey, altKey, shiftKey }) {
    const keys = [...keysPressed]

    // 删除释放的键
    if (keys.includes(key))
      keys.splice(keys.indexOf(key), 1)

    // 删除组合键
    if (metaKey || ctrlKey || altKey || shiftKey) {
      if (keys.includes('Meta') || keys.includes('Control') || keys.includes('Alt') || keys.includes('Shift')) {
        keys.splice(keys.indexOf('Meta'), 1)
        keys.splice(keys.indexOf('Control'), 1)
        keys.splice(keys.indexOf('Alt'), 1)
        keys.splice(keys.indexOf('Shift'), 1)
      }
    }

    // 更新状态
    setKeysPressed(keys)
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    // 清除监听
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // 仅在挂载和卸载时添加和删除事件监听器

  useEffect(() => {
    // 检查每个组合键是否匹配
    Object.keys(keyEvents).forEach((keys) => {
      const combinationKeys = keys.split('+')
      if (combinationKeys.every(key => keysPressed.includes(key))) {
        // 执行回调函数
        keyEvents[keys]()
      }
    })
  }, [keysPressed]) // 每次按键状态更新时检查组合键是否匹配

  return keysPressed
}

export default useKeyEvents
