import React from 'react'

// import useKeyEvents from './hooks/useKeyEvents'
import { useShortcurt } from './hooks/useKeyDown'

// import { useKeyPress } from 'ahooks'

function MyComponent() {
  const keysPressed = useShortcurt(
    'meta.c',
    () => {
      console.log('Command + c is pressed')
      // 执行目标事件
    },
  )

  return (
    <div>
      <p>Keys pressed:</p>
      <div className="w-200px">
        <span className="">1:</span>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos fugit velit porro? Impedit itaque explicabo commodi, aliquam numquam eaque, ratione voluptatum placeat illo autem sapiente in maiores nihil? Repellat, ab.</span>
      </div>
    </div>
  )
}

export default MyComponent
