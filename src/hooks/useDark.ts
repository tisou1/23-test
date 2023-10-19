import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

function getSystemTheme() {
  if (typeof window === 'undefined')
    return
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)').matches
  return themeMedia
}

type Theme = 'dark' | 'light' | 'auto'

export default function useDark(): {
  isDark: boolean | undefined
  setDark: (value: Theme) => void
  toggleDark: () => void
} {
  const [theme, setTheme] = useLocalStorage('si-theme', 'auto')
  const isDark = theme === 'auto' ? getSystemTheme() : theme === 'dark'

  useEffect(() => {
    // isDark将会添加'dark'类名, 为false将会清除'dark'类名'
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const setDark = (value: Theme) => {
    setTheme(value)
  }

  const toggleDark = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    isDark,
    setDark,
    toggleDark,
  }
}

const isAppearanceTransition = document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDarkTransition(event?: MouseEvent, isDark, toggleDark) {
  if (!isAppearanceTransition || !event) {
    // isDark.value = !isDark.value
    
    toggleDark()
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    // isDark.value = !isDark.value
    toggleDark()
    // await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
