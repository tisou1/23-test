import React, { createContext, useContext } from 'react'
import Pagitation from '~/components/pagitation'

const TContext = createContext({
  name: 'siry',
  age: 18,
})

export default function Test() {
  const onChange = (curPage, prePage, step) => {
    console.log(`当前页:${curPage}, 先钱页: ${prePage}, step:${step}`)
  }
  // let a = 'c'
  {
    var a = 'd'
    console.log(a)
  }

  console.log(a)
  return (
  // <TContext.Provider value={{ name: 'siry-2', age: 18 }}>
  //   <Layout>
  //     <Post text="post"/>
  //     <Son1 />
  //     <Son2 />
  //     <Son3 />
  //   </Layout>
  // </TContext.Provider>

    <Pagitation totalCount={200} currentPage={1} onChange={onChange} />
  )
}

function Layout(props: any) {
  return <>
    {props.children}
  </>
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

