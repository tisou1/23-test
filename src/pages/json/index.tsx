import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const JSonObj = {
  name: 'jsonview',
  age: 22,
  obj: {
    a: 1,
    b: 2,
    arr: [1, 2, 'ssd'],
  },
  arr: [1, 2, 3, 4, 5],
}

export default function JsonViewApp() {
  return (
    <section className="json-view outline-dotted-blue-gray-400">
      <JsonView src={JSonObj}/>
    </section>
  )
}
