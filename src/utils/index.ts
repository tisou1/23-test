import store from '~/store'

export type UserStore = <T>(
  txMode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => T | Promise<T>,
) => Promise<T>

// promise化
export function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // oncomplete  onabort 属于IDBTransactio上的事件
    //  @ts-expect-error - file size hacks
    request.oncomplete = request.onsuccess = () => resolve(request.result)
    //  @ts-expect-error - file size hacks
    request.onabort = request.onerror = () => reject(request.error)
  })
}

export function createStore(dbName: string, storeName: string): UserStore {
  const request = window.indexedDB.open(dbName)
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
    store.put(value, key)
    return promisifyRequest(store.transaction)
  })
}
