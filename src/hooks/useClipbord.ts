import { useRef, useState } from 'react'

export interface UseClipboardOptions {
  // 初始值
  value?: string
}

export default function useClipboard(props: UseClipboardOptions) {
  const {
    value,
  } = props
  // 如果navigator?.clipboard是undefined表示不支持
  const isSupportClipboard = useRef(!!navigator?.clipboard)
  const [valueState, setValueState] = useState<string | undefined>(value)
  const [copied, setCopied] = useState(false)

  async function copy(value: string) {
    try {
      // 判断可不可用navigator?.clipboard
      if (isSupportClipboard && value) {
        await navigator?.clipboard.writeText(value)
      }
      else {
        // 使用execCommand
        legacyCopy(value)
      }
    }
    catch (e) {
      throw new Error('复制出错')
    }
    setCopied(true)
    setValueState(value)
  }

  function legacyCopy(value: string) {
    const textarea = document.createElement('textarea')
    textarea.value = value ?? ''
    textarea.style.position = 'absolute'
    textarea.style.opacity = '0'
    document.append(textarea)
    // 要选中textarea只能给
    textarea.select()
    // 将选中内容复制到剪切板
    document.execCommand()
    // 删除textarea元素
    textarea.remove()
  }

  return {
    onCopy: copy,
    text: valueState,
    isCopied: copied,
  }
}
