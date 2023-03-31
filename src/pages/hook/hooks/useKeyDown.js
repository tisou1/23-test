import { useEffect } from 'react'
export default function useKeyDown(shortcut, callback) {
  const keys = shortcut.toLowerCase().split('.')

  useEffect(() => {
    function handleKeyDown(event) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key === 'meta' && !event.metaKey)
          return

        else if (key === 'ctrl' && !event.ctrlKey)
          return

        else if (key === 'alt' && !event.altKey)
          return

        else if (key === 'shift' && !event.shiftKey)
          return

        else if (key !== 'meta' && key !== 'ctrl' && key !== 'alt' && key !== 'shift' && event.key.toLowerCase() !== key)
          return
      }

      callback(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback, keys])
}

export function useShortcurt(shortcut, callback) {
  const keys = shortcut.split('.')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (keys.every((key) => {
        if (key === 'meta')
          return event.metaKey
        if (key === 'ctrl')
          return event.ctrlKey
        if (key === 'alt')
          return event.altKey
        if (key === 'shift')
          return event.shiftKey
        return event.key.toLowerCase() === key
      }))

        callback(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcut, callback])
}
