export default function Test() {
  return (
    <Layout>
      <Post text="post"/>
    </Layout>
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
