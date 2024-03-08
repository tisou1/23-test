import { indexedDB } from 'fake-indexeddb'

export type UserStore = <T>(
  txMode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => T | Promise<T>,
) => Promise<T>

// promise化
export function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // oncomplete  onabort 属于IDBTransactio上的事件
    // oncomplete onabort存储对象上的事务操作事件
    // onsuccess onerror数据库打开时的事件
    //  @ts-expect-error - file size hacks
    request.oncomplete = request.onsuccess = () => resolve(request.result)
    //  @ts-expect-error - file size hacks
    request.onabort = request.onerror = () => reject(request.error)
  })
}

export function createStore(dbName: string, storeName: string): UserStore {
  // globalThis
  const request = indexedDB.open(dbName)
  // onupgradeneeded:  当数据库的版本号发生变化时或首次创建数据库时，该事件会触发
  // createObjectStore: 创建对象存储空间
  request.onupgradeneeded = () => request.result.createObjectStore(storeName)

  const dbp = promisifyRequest(request)
  return (txMode, callback) =>
  // transaction 执行异步数据库事务
  // objectStore返回指定名称的对象仓库
    dbp.then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)))
}
let defaultGetStoreFunc: UserStore | undefined

// 获取默认store
function defaultGetStore() {
  if (!defaultGetStoreFunc)
    return createStore('keyval-store', 'keyval')

  return defaultGetStoreFunc
}

export function get<T = any>(key: IDBValidKey, customStore = defaultGetStore()): Promise<T> {
  return customStore('readonly', store => promisifyRequest(store.get(key)))
}

export function set<T = any>(key: IDBValidKey, value: any, customStore = defaultGetStore()): Promise<T> {
  return customStore('readwrite', (store) => {
    // put方法, 如果有记录则更新记录, 如果没有则为新加
    store.put(value, key)
    // store.transaction: 获取对象存储空间的事务：
    return promisifyRequest(store.transaction)
  })
}

export function del<T = any>(key: IDBValidKey, customStore = defaultGetStore()): Promise<T> {
  return customStore('readwrite', (store) => {
    store.delete(key)
    return promisifyRequest(store.transaction)
  })
}

export function delMany<T = any>(keys: IDBValidKey[], customStore = defaultGetStore()): Promise<T> {
  return customStore('readwrite', (store) => {
    keys.forEach((key) => {
      store.delete(key)
    })
    return promisifyRequest(store.transaction)
  })
}

export function keys(customStore = defaultGetStore()): Promise<IDBValidKey[]> {
  return customStore('readonly', (store) => {
    return promisifyRequest(store.getAllKeys())
  })
}

export function values<T = any>(customStore = defaultGetStore()): Promise<T[]> {
  return customStore('readonly', (store) => {
    return promisifyRequest(store.getAll())
  })
}

export function entries<T extends IDBValidKey, V = any>(customStore = defaultGetStore()): Promise<[T, V][]> {
  return customStore('readonly', (store) => {
    return Promise.all([
      promisifyRequest(store.getAllKeys() as unknown as IDBRequest<T[]>),
      promisifyRequest(store.getAll() as IDBRequest<V[]>),
    ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]))
  })
}
