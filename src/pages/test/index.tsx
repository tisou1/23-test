import React, { createContext, useContext } from 'react'
import svg from '~/svg'
import Svg2 from '~/algorithm.svg'
import './index.scss'
import { get, keys, set } from '../../utils'
import Input from '~/components/Input'
import { useScrolling } from '~/hooks'

const TContext = createContext({
  name: 'siry',
  age: 18,
})

export default function Test(props) {
  const scrolling = useScrolling()

  console.log('滚动中:', scrolling)

  const tags = new Proxy((name, ...args) => {
    console.log(name, ...args)
  }, {
    get: (tag, name) => {
      console.log(tag, 'tag')
      return tag.bind(undefined, name)
    },
  })

  const { div, asd } = tags
  // 这里无论导出什么东西, 都是函数内容体

  console.log(tags)
  // console.log(tags(2, 3))
  console.log(div('siry'))
  console.log(asd('tikl'))

  const onChange = (curPage, prePage, step) => {
    console.log(`当前页:${curPage}, 先钱页: ${prePage}, step:${step}`)
  }

  const handleClick1 = () => {
    set('siry', { name: 'siry', age: 18 }).then((res) => {
      console.log(res)
    })
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    get('siry').then((res) => {
      console.log(res,
      )
    })
  }

  const handleClick3 = () => {
    keys().then((res) => { console.log(res) })
  }
  return (
    <div onMouseDown={() => { console.log('mouseDown') }}>
      {/* <TContext.Provider value={{ name: 'siry-2', age: 18 }}>
      <Layout>
        <Post text="post"/>
        <Son1 />
        <Son2 />
        <Son3 />
      </Layout>
    </TContext.Provider> */}

      {/* <Test2 /> */}
      <button onClick={handleClick1}>存储</button>

      <button onClick={handleClick}>获取</button>
      <button onClick={handleClick3}>获取keys</button>

      <div className="mt-6">
        <Input />
      </div>

      <div className="test-over">
        text
      </div>
      <button onClick={() => {
        window.scrollTo(0, 500)
      }}
      >
        滚动
      </button>
      <div style={{ width: 200 }} className="h-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat debitis iusto tempora nemo cupiditate ratione molestiae expedita incidunt! Voluptate a assumenda placeat unde nihil architecto accusantium labore perferendis quam quas.
        Lorem ipsum dolor sit amet co
      </div>

      {/* <Pagitation totalCount={200} currentPage={1} onChange={onChange} /> */}
    </div>
  )
}

function Layout(props: any) {
  return (
    <>
      {props.children}
    </>
  )
}

function Post(props: any) {
  return (
    <div>
      {props.text}
    </div>
  )
}

// context使用的三种方式
class Son1 extends React.Component {
  static contextType?: React.Context<any> | undefined = TContext
  render() {
    const c = this.context
    return (
      <div>{JSON.stringify(c)}</div>
    )
  }
}

function Son2() {
  const c = useContext(TContext)
  return (
    <div>{JSON.stringify(c)}</div>
  )
}

class Son3 extends React.Component {
  render() {
    return (
      <TContext.Consumer>
        {
          c => (
            <div>{JSON.stringify(c)}</div>
          )
        }
      </TContext.Consumer>
    )
  }
}

function Test2() {
  return (
    <section>
      <div className="test-svg1 w-20px h-20px bg-no-repeat" style={{ backgroundImage: `url(${svg[1]})` }}>

      </div>
      {/* <div className="text-svg w-20px h-20px bg-no-repeat" style={{ backgroundImage: 'url(../../algorithm.svg)' }} >
</div> */}
      <div className="test-svg2 w-20px h-20px bg-no-repeat" style={{ backgroundImage: `url(${Svg2})` }}>
      </div>

      <div className="test-svg3 w-20px h-20px bg-no-repeat">
      </div>

      <div className="test-svg4">
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>算法</title>
          <defs>
            <linearGradient x1="89.9428534%" y1="100%" x2="14.8822422%" y2="0%" id="linearGradient-1">
              <stop stopColor="#7BD964" offset="0%"></stop>
              <stop stopColor="#54CC39" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g id="算法" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
              <g id="图标背景/1" fill="url(#linearGradient-1)">
                <rect id="矩形备份-5" x="0" y="0" width="20" height="20" rx="4"></rect>
              </g>
              <g transform="translate(1.500000, 2.000000)">
                <g id="**通用图标参考线**备份" opacity="0" strokeWidth="0.1">
                  <g id="编组" transform="translate(0.000000, 0.000000)" opacity="0.1">
                    <rect id="矩形" stroke="#000000" fill="#FFFFFF" x="0.55" y="0.05" width="15.9" height="15.9"></rect>
                    <rect id="矩形" stroke="#FF0000" x="2.55" y="1.05" width="11.9" height="13.9"></rect>
                    <rect id="矩形备份" stroke="#003CFF" transform="translate(8.500000, 8.000000) rotate(-270.000000) translate(-8.500000, -8.000000) " x="2.55" y="1.05" width="11.9" height="13.9"></rect>
                    <circle id="椭圆形" stroke="#000000" cx="8.5" cy="8" r="6.95"></circle>
                    <circle id="椭圆形备份-4" stroke="#000000" cx="8.5" cy="8" r="3.95"></circle>
                    <circle id="椭圆形备份-5" stroke="#000000" cx="8.5" cy="8" r="2.95"></circle>
                    <line x1="0.5" y1="2.84217094e-13" x2="16.5" y2="16" id="路径-2" stroke="#000000"></line>
                    <line x1="0.5" y1="2.84217094e-13" x2="16.5" y2="16" id="路径-2备份" stroke="#000000" transform="translate(8.500000, 8.000000) rotate(90.000000) translate(-8.500000, -8.000000) "></line>
                    <line x1="2.84314575" y1="2.34314575" x2="14.1568542" y2="13.6568542" id="路径-2备份-3" stroke="#000000" transform="translate(8.500000, 8.000000) rotate(135.000000) translate(-8.500000, -8.000000) "></line>
                    <line x1="2.84314575" y1="2.34314575" x2="14.1568542" y2="13.6568542" id="路径-2备份-2" stroke="#000000" transform="translate(8.500000, 8.000000) rotate(45.000000) translate(-8.500000, -8.000000) "></line>
                    <path d="M8.24950958,1.11268786 C8.4838469,1.04790846 8.74289673,1.07252573 8.97111509,1.20189406 C9.12070214,1.28668929 9.24447029,1.41049405 9.32922127,1.56010618 L16.1108194,13.5317603 C16.2401202,13.7600169 16.2646609,14.019074 16.1998122,14.2533922 C16.1349634,14.4877103 15.9807254,14.6972895 15.7524688,14.8265903 L1.71635438,14.95 C1.45401913,14.95 1.21651913,14.8436676 1.04460294,14.6717514 C0.872686754,14.4998353 0.766354382,14.2623353 0.766354382,14 L7.67617912,1.55986169 C7.80554745,1.33164333 8.01517226,1.17746725 8.24950958,1.11268786 Z" id="三角形" stroke="#FFAD00"></path>
                  </g>
                </g>
                <g id="图算法组件-(1)" transform="translate(2.000000, 2.500000)" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
                  <polygon id="1-FL" points="0 11 13 11 13 0 0 0"></polygon>
                </g>
                <polyline id="路径" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(11.403201, 8.000000) rotate(45.000000) translate(-11.403201, -8.000000) " points="10.4032009 7 12.4032009 7 12.4032009 9"></polyline>
                <polyline id="路径备份" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(5.641383, 8.000000) scale(-1, 1) rotate(45.000000) translate(-5.641383, -8.000000) " points="4.64138265 7 6.64138265 7 6.64138265 9"></polyline>
                <line x1="10.4481169" y1="4.64281959" x2="6.55188314" y2="11.3571804" id="路径-8" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"></line>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  )
}

/*
有这个需求主要是, 长度过长要溢出隐藏, 长度不超过时, 背景色只显示在文字那部分
1. width: auto

card样式
  width: auto;
  max-width: 100px;
  background-color: bisque;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;

  2. 再套一个盒子,设置display: flex

  然后card只需要设置这里几个
  background-color: bisque;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

*/
