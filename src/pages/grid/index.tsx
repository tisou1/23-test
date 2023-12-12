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
 */

export default function Grid() {
  return (
    <div className="grid grid-cols-[2fr_5fr] grid-rows-[50px_1fr] w-100vw h-100vh">
      {/* span表示跨度  纯数字表示线 */}
      {/* 上下  左右 布局  */}
        {/* <div className="header bg-red-200 row-span-1 col-span-2">
          header: 
        </div>
        <div className="sider bg-blue-100 row-span-2 col-span-1">
        sider: 
        </div>
        <div className="content bg-pink-200 row-span-1 col-span-1">content</div> */}

        {/* 左右 -> 上下   布局*/}
        <div className="sider bg-blue-100 row-span-2 col-span-1">
          sider: 
          </div>
        <div className="header bg-red-200 row-span-1 col-span-1">
          header: 
        </div>
   
        <div className="content bg-pink-200 row-span-1 col-span-1">content</div>
    </div>
  )
}