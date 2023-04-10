import React, { createContext, useContext } from 'react'

const TContext = createContext({
  name: 'siry',
  age: 18,
})

export default function Test() {
  return (
    <TContext.Provider value={{ name: 'siry-2', age: 18 }}>
      <Layout>
        <Post text="post"/>
        <Son1 />
        <Son2 />
        <Son3 />
      </Layout>
    </TContext.Provider>
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

