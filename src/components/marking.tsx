// import clamp from '@/utils/clamp';
import classNames from 'classnames'
import React, { useMemo } from 'react'

function clamp(number: number, lower: number, upper: number): number {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}

export interface RemarkRingProps {
  remark: string
  caption: string
  /**
   * `null` if the percentage is not appliable.
   * Otherwise, this is an integer between 0 and 100.
   */
  percentage?: number | null
  /**
   * Default to 7 rem.
   */
  size?: number
}

const rootFontSize = parseInt(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('font-size'),
)
console.log(rootFontSize)
export default function RemarkRing({
  remark,
  caption,
  percentage = null,
  size = 7,
}: RemarkRingProps) {
  const clipPath = useMemo((): string | undefined => {
    if (percentage === null)
      return undefined

    const clamped = clamp(percentage, 0, 100)
    if (clamped === 100)
      return undefined

    const alpha = Math.PI * 2 * (clamped / 100)
    const r = (rootFontSize * size) / 2
    const path = `M ${r},0 A ${r},${r} 0 ${clamped > 50 ? 1 : 0},1 ${
      r + Math.sin(alpha) * r
    },${r + -Math.cos(alpha) * r} L ${r},${r} Z`
    return `path("${path}")`
  }, [percentage, size])
  return (
    <div
      className={classNames(
        'relative flex flex-shrink-0 box-border  flex-col items-center justify-center rounded-full border-solid border-8 border-indigo-200 bg-transparent dark:border-gray-700',
      )}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
    >
      {percentage !== null && (
        <div
          className="absolute -inset-2 rounded-full border-solid border-8 border-indigo-400 bg-transparent dark:border-indigo-500"
          style={{ clipPath }}
          aria-hidden
        />
      )}
      <span className="text-xl tabular-nums text-gray-800 dark:text-gray-300">
        {remark}
      </span>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-500">
        {caption}
      </span>
    </div>
  )
}

/*
      大写字母是绝对定位
      小写字母是相对相对定位,相对于上一个店

      M x y 表示移动画笔到一个位置,不画线
       M 10 20

      L x y 表示从画笔位置划线到(x,y)

      H x绘制水平线
      V y 绘制垂直线

      A 弧形
      A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      参数依次是
        rx -- x轴半径
        ry -- y轴半径
        x-axis-rotation -- 弧形的旋转
        large-arc-flag -- 决定弧线是大于还是小于 180 度，0 表示小角度弧，1 表示大角度弧。
        sweep-flag -- 表示弧线的方向，0 表示从起点到终点沿逆时针画弧，1 表示从起点到终点沿顺时针画弧
        x -- x轴终点
        y -- y轴终点

      Z 不区分大小写, Z命令会从当前点画一条直线到路径的起点.
    */
