/**
 * grid布局
 *
 * grid-row: 2, 表示占据第二行
 * grid-row: 2 / span 3; 表示从第二行开始,跨越3行. 占据第2, 3 ,4 三行
 * grid-row: 2 / 4; 表示从第2行开始,到第四行结束 (左闭右开区间) -- 这里其实有个线的概念 3行其实是有4个线
 * grid-row: span 2 / 4; 表示即将跨越两行, 在第四行结束
 *
 * grid-row: span 2 / span 2; 如何理解?  其实就表示元素即将跨越两行
 * // 也就等价于  grid-row: span 2;
 *
 * 参考 https://www.joshwcomeau.com/css/interactive-guide-to-grid/
 *
 */

import stylex from '@stylexjs/stylex'
import './index.scss'

const style_x = stylex.create({
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
    gridTemplateRows: '50px 1fr',
    gridTemplateAreas: `
    'sider header' 
    'sider  content'
  `,
    height: '100rem',
  },
  sider: {
    gridArea: 'sider',
    backgroundColor: 'rgb(219 234 254)',
  },
  header: {
    gridArea: 'header',
    backgroundColor: 'rgb(254 202 202 / 1)',
  },
  content: {
    gridArea: 'content',
    backgroundColor: 'rgb(251 207 232 / 1)',

  },
})

console.log(stylex.props(style_x.container))

export default function Grid() {
  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-[2fr_5fr] grid-rows-[50px_1fr] h-100">
        {/* span表示跨度  纯数字表示线 */}
        {/* 上下  左右 布局  */}
        {/* <div className="header bg-red-200 row-span-1 col-span-2">
          header:
        </div>
        <div className="sider bg-blue-100 row-span-1 col-span-1">
        sider:
        </div>
        <div className="content bg-pink-200 row-span-1 col-span-1">content</div> */}

        {/* 左右 -> 上下   布局 */}
        {/* <div className="sider bg-blue-100 row-span-2 col-span-1">
          sider:
          </div>
        <div className="header bg-red-200 row-span-1 col-span-1">
          header:
        </div>

        <div className="content bg-pink-200 row-span-1 col-span-1">content</div> */}

        {/* 使用索引 */}
        {/* <div className="header bg-red-200 row-span-1 col-start-2 col-end-3">
          header:
        </div>
        <div className="sider bg-blue-100 row-start-1 row-end-3 col-span-1">
        sider:
        </div>
        <div className="content bg-pink-200 row-span-1 col-span-1">content</div> */}
        {/* 使用索引和span结合 */}
        {/* <div className="header bg-red-200 row-span-1 col-[span_1/_3]">
          header:
        </div>
        <div className="sider bg-blue-100 row-[1_/_span_2] col-span-1">
        sider:
        </div>
        <div className="content bg-pink-200 row-span-1 col-span-1">content</div> */}
      </div>

      <div {...stylex.props(style_x.container)}>
        <div {...stylex.props(style_x.header)}>header</div>
        <div {...stylex.props(style_x.sider)}>sider</div>
        <div {...stylex.props(style_x.content)}>content</div>
      </div>

      {/*
    // 主轴(默认水平方向)
    // 类名写在父元素上
      justify-content 用来对齐容器中的子元素
      justify-items 用来在子元素内部进行对齐

      // 类名写在子元素上
      justify-self 用来在指定的子元素内部进行对齐

      // 同理 在垂直方向(交叉轴)
      align-content
      align-items
      align-self

        在flex布局中, 如果要垂直居中,一般都是 justify-content: center 和 align-items: center

        在 Flexbox 布局中，align-content 属性是用于多行的情况，而不是单行的情况。
        如果你的 Flex 容器只有一行，通常你应该使用 align-items 来实现垂直居中。

        如果单行要使用align-content: center来达到垂直居中的话, 需要设置 flex-wrap的值部位nowrap才行

    */}

      <div className="flex-text">
        <div className="item one"></div>
        <div className="item two"></div>
        <div className="item one"></div>
        <div className="item two"></div>
        <div className="item two"></div>
      </div>
    </section>
  )
}
