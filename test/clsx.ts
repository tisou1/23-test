type ClassArray = ClassValue[]
type ClassDictionary = Record<string, any>

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassArray
  | ClassDictionary

function toValue(mix: ClassValue): string {
  let str = ''
  if (typeof mix === 'string' || typeof mix === 'number') {
    return str += mix
  }
  else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      // 遍历数组进行递归
      for (let i = 0; i < mix.length; i++) {
        const curValue = mix[i]
        if (curValue) {
          const returnValue = toValue(curValue)
          if (returnValue) {
            str && (str += ' ')
            str += returnValue
          }
        }
      }
    }
    else {
      // object
      for (const k in mix) {
        const curValue = mix[k]
        if (curValue) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

export default function clsx(...args: ClassValue[]): string {
  let temp
  let i = 0
  let x
  let str = ''
  const len = args.length
  while (i < len) {
    temp = args[i++]
    // 是否是真值
    if (temp) {
      x = toValue(temp)
      str && (str += ' ')
      str += x
    }
  }

  return str
}
