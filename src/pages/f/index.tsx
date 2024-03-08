import React, { Fragment, useEffect, useState } from 'react'
import './index.scss'

// 文本编辑器,带行号的-待完善
function TextEditor() {
  const [text, setText] = useState('')
  const [lines, setLines] = useState([])

  useEffect(() => {
    setLines(text.split('\n'))
  }, [text])

  return (
    <div className="main">
      <div className="header"></div>
      <div className="text-editor">
        <textarea
          className="text-editor-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <pre className="text-editor-lines">
          {lines.map((line, index) => (
            <Fragment key={index}>
              <span className="text-editor-line-number">{index + 1}</span>
              {`${line}\n`}
            </Fragment>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default TextEditor
