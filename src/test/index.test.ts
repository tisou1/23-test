import { expect, it } from 'vitest'

it('mapToObj', () => {
  function mapToObj(map) {
    const obj = {}
    for (const [key, value] of map)
      obj[key] = value

    return obj
  }

  const map = new Map().set('name', 'An').set('des', 'JS').set({ name: 'cc' }, '对象')
  // {name: "An", des: "JS"}

  expect(mapToObj(map)).toMatchInlineSnapshot(`
    {
      "[object Object]": "对象",
      "des": "JS",
      "name": "An",
    }
  `)
})
