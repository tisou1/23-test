import React from 'react'
import { toggleDarkTransition, useDark } from '../hooks'

export default function Footer() {
  const { isDark, toggleDark } = useDark()

  return (
    <div className="text-center py-6 flex justify-center">
      <div onClick={e => toggleDarkTransition(e, isDark, toggleDark)}>
        {
          isDark
            ? <span className="i-carbon-moon text-gray-200"></span>
            : <span className="i-carbon-sun"></span>
        }
      </div>
      <a href="https://github.com/tisou1/react-lite" target="_blank">
        <span className="i-carbon-logo-github ml-3"></span>
      </a>
    </div>
  )
}
