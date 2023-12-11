function getLocalStorageItem(key, path = null) {
  if (typeof (Storage) !== 'undefined') {
    const item = localStorage.getItem(key)
    if (item) {
      const deserialized = JSON.parse(item)
      if (path != null) {
        const value = _.get(deserialized, path)
        if (value != null)
          return value
      }
      else {
        return deserialized
      }
    }
  }
}

function setLocalStorageItem(key, value) {
  if (typeof (Storage) !== 'undefined') {
    if (value == null)
      localStorage.removeItem(key)

    else
      localStorage.setItem(key, JSON.stringify(value))
  }
}
