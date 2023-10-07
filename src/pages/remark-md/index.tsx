import { useEffect } from 'react'
import { Remark, useRemark } from 'react-remark'

export default function App() {
  const [reactContent, setMarkdownSource] = useRemark()

  useEffect(() => {
    setMarkdownSource('# React')
  }, [])
  return (
    <div className='bg-blue-100'>
      <div>{reactContent}</div>
      <div> <Remark>{`
# header

1. ordered
2. list

## header2

- 11111
- 2222
`}</Remark></div>
    </div>
  )
}
