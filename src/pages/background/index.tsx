import './index.scss'

export default function APP() {
  const testData = [
    { name: 'siry.age.cc' },
    { name: 'siry.name.dd' },
    { name: 'tisou1.age' },
    { name: 'tisou1.address.c.d.f.g.h.j' },
  ]

  const getResult = () => {
    const result = {}
    testData.forEach((item) => {
      const keys = item.name.split('.')
      keys.reduce((acc, key, index, array) => {
        if (index === array.length - 1)
          acc[key] = undefined

        else
          acc[key] = acc[key] || {}

        return acc[key]
      }, result)
    })
    return result
  }

  console.log(getResult())

  return (
    <div className="background-l">
      2222
    </div>
  )
}
