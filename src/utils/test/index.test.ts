import { describe, expect, it } from 'vitest'
import { createStore, del, get, set } from '../index'

describe('indexDb', async () => {
  const store = createStore('mudb', 'store1')
  await set('key1', 'val1', store)
  await set('key2', 'val2', store)

  it('test get', async () => {
    const res1 = await get('key1', store)
    const res2 = await get('key2', store)

    expect(res1).toBe('val1')
    expect(res2).toBe('val2')
  })

  it('test del', async () => {
    await del('key1')
    get('keys').then((data) => {
      expect(data).not.toBe('val1')
      expect(data).toBeUndefined()
    })
  })
})
