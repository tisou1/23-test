import { describe, it, expect } from 'vitest'


describe('basic', () => {
    it('add', () => {
        expect(1 + 1).toEqual(2)
    })
})


it('test', () => {
    const arr = [
        [1, 9, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
        [2, 8, 12, 18, 22],
        [3, 7, 12, 13, 14, 15, 16, 18, 22],
        [4, 6, 16, 18, 22],
        [5, 5, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
    ]

    expect(demo(arr)).toMatchInlineSnapshot(`
      " █       █  █████ █████       
        █     █   █     █   █       
         █   █    █████ █   █       
          █ █         █ █   █       
           █      █████ █████       
      "
    `)
})


function demo(arr) {
    let str = ''
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < 30; j++) {
            if (arr[i].indexOf(j) > -1) {
                str += '█'
            } else {
                str += ' '
            }
        }
        str += '\n'
    }
    return str
}