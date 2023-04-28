import { expect, it } from 'vitest'
import { produce } from './immer-mini/immer'

it('immer', () => {
  const baseState = {
    a1: {
      b1: {
        c1: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
        ],
      },
      b2: {
        c2: 'c2',
        c3: {
          d1: 'd1',
        },
      },
    },
    a2: {
      b3: 1,
    },
  }

  const nextState = produce(baseState, (draft) => {
    draft.a1.b1.c1.push({ id: 5 })
    draft.a1.b1.c1.splice(0, 1)
    draft.a1.b1.c1[2] = { id: '2-edit' }
    draft.a2.b3 = 3
  })

  expect(nextState).toMatchInlineSnapshot(`
    {
      "a1": {
        "b1": {
          "c1": [
            {
              "id": 2,
            },
            {
              "id": 3,
            },
            {
              "id": "2-edit",
            },
            {
              "id": 5,
            },
          ],
        },
        "b2": {
          "c2": "c2",
          "c3": {
            "d1": "d1",
          },
        },
      },
      "a2": {
        "b3": 3,
      },
    }
  `)

  // console.log(JSON.stringify(baseState, null, 2))
  console.log('>>>>>'.repeat(10))
  console.log(JSON.stringify(nextState, null, 2))
  console.log('>>>>>'.repeat(10))
})
