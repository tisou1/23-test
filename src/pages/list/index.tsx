// import { FixedSizeList } from 'react-window'
import { FixedSizeList } from './components'

export default function List() {
  return (
    <section className='bg-blue-200 w-200px'>
      <FixedSizeList
        width={200}
        height={300}
        itemCount={1000} // 列表数据长度
        itemSize={35} // 列表行高
      >
        {Row}
      </FixedSizeList>
    </section>
  )
}

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
)
