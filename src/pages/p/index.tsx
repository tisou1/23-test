import { useMemo } from 'react'
import './index.scss'
// svg画图
const data = { size: 80, value: 0.5592 }

function getParams1(size: number): string {
  // 半径
  const radius = size / 3
  // 起点
  const x = size / 2
  // 这里相当于把svg的高度分成6份,然后y为1份
  // 1/2 - 1/3 = 1/6
  const y = size / 2 - radius
  // 线宽
  return `M ${x} ${y} A ${radius} ${radius} 0 1 1 ${x - 0.0001} ${y} z`
}

function getParams2(size: number, value: number): string {
  const radius = size / 3
  // 起点
  const x = size / 2
  // 这里相当于把svg的高度分成6份,然后y为1份
  // 1/2 - 1/3 = 1/6
  const y = size / 2 - radius

  const localValue = Math.max(0.01, value)
  const degrees = localValue * 360
  const radians = ((degrees - 180) * Math.PI) / 180
  const endX = -Math.sin(radians) * radius + size / 2 - 0.0001
  const endY = Math.cos(radians) * radius + size / 2
  const z = localValue === 1 ? 'z' : ''
  const largeArc = localValue < 0.5 ? 0 : 1

  return `M ${x} ${y} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} ${z}`
}
const Donut = (props: any) => {
  const { size, value } = data
  // 半径
  const radius = size / 3
  // 起点
  const x = size / 2
  // 这里相当于把svg的高度分成6份,然后y为1份
  // 1/2 - 1/3 = 1/6
  const y = size / 2 - radius
  const style = { width: size, height: size }
  // 线宽
  const strokeWidth = size / 6

  const dBg = `M ${x} ${y} A ${radius} ${radius} 0 1 1 ${x - 0.0001} ${y} z`
  const d = useMemo(() => {
    const localValue = Math.max(0.01, value)
    const degrees = localValue * 360
    const radians = ((degrees - 180) * Math.PI) / 180
    const endX = -Math.sin(radians) * radius + size / 2 - 0.0001
    const endY = Math.cos(radians) * radius + size / 2
    const z = localValue === 1 ? 'z' : ''
    const largeArc = localValue < 0.5 ? 0 : 1

    return `M ${x} ${y} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} ${z}`
    }, [value, size]); // eslint-disable-line

  return (

    <>
      <svg
        style={style}
        width={size}
        height={size}
        className="donut"
        viewBox={`0 0 ${size} ${size}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="donut_bg" d={dBg} strokeWidth={strokeWidth} fill="transparent" />

        <path className="donut_fg" d={d} strokeWidth={strokeWidth} fill="transparent" />
      </svg>

      {/* <svg width={180} height={180} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">

        <path fill="none" stroke="red"
          d="M 6,10
           A 6 4 10 1 0 14,10" />

        <path fill="none" stroke="lime"
          d="M 6,10
           A 6 4 10 1 1 14,10" />

        <path fill="none" stroke="purple"
          d="M 6,10
           A 6 4 10 0 1 14,10" />

        <path fill="none" stroke="pink"
          d="M 6,10
           A 6 4 10 0 0 14,10" />
      </svg> */}

      <P2 />
    </>
  )
}

const P2 = () => {
  const { size, value } = data

  const strokeWidth = size / 6
  const bgD = getParams1(size)
  const d = getParams2(size, value)
  const style = { width: size, height: size }

  return (
    <svg style={style} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="red"
        strokeWidth={strokeWidth}
        d={`${bgD}`}/>
      <path fill="none" stroke="orange"
        strokeWidth={strokeWidth}
        d={`${d}`}
      />
    </svg>
  )
}

export default Donut
