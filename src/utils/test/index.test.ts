import { describe, expect, it } from 'vitest'
import { createStore, del, delMany, entries, get, keys, set, values } from '../index'

describe('indexDb', async () => {
  it('test get', async () => {
    const store = createStore('mudb', 'store1')
    await set('key1', 'val1', store)
    await set('key2', 'val2', store)
    const res1 = await get('key1', store)
    const res2 = await get('key2', store)

    expect(res1).toBe('val1')
    expect(res2).toBe('val2')
  })

  it('test del', async () => {
    await set('key1', 'val1')
    await set('key2', 'val2')
    await del('key1')
    get('keys').then((data) => {
      expect(data).not.toBe('val1')
      expect(data).toBeUndefined()
    })
  })

  it('test keys', async () => {
    await set('key1', 'val1')
    await set('key2', 'val2')
    const key = await keys()
    expect(key).toEqual(['key1', 'key2'])
  })

  it('test values', async () => {
    await set('key1', 'val1')
    await set('key2', 'val2')
    const key = await values()
    expect(key).toEqual(['val1', 'val2'])
    expect(key.length).toBe(2)
  })

  it('test entries', async () => {
    await set('key1', 'val1')
    await set('key2', 'val2')
    const key = await entries()
    expect(key).toEqual([['key1', 'val1'], ['key2', 'val2']])
    expect(key.length).toBe(2)
  })

  it('test del', async () => {
    await set('key1', 'val1')
    await set('key2', 'val1')
    await delMany(['key1', 'key2'])
    expect((await keys()).length).toBe(0)
  })
})
