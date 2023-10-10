import React from 'react'
import useTypingEffect from '~/hooks/useTypingEffect'

const texts = [
  'This is a simple text typing effect in React',
  'This effect is created using React Hooks',
  'We can use this effect to create a typing effect for our portfolio',
  'We can also use this effect to create a typing effect for our resume',
  'or for your blog',
  'or for your landing page',
  'let\'s go',
]

interface TextTypingEffectProps {
  isTypeByLetter?: boolean
  duration?: number
}

const TIME_TO_FADE = 300
const TIME_INTERVAL = 3000
const TIME_PER_LETTER = 100

function TextTypingEffectWithTextsFadeOut() {
  const [textIndex, setTextIndex] = React.useState(0)
  const [fadeText, setFadeText] = React.useState(true)
  const [fadeCircle, setFadeCircle] = React.useState(true)
  const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false)

  const timeToTypeText = texts[textIndex].split(' ').length * TIME_PER_LETTER

  React.useEffect(() => {
    const circleTimeout = setTimeout(() => {
      setFadeCircle(false)
    }, timeToTypeText + 1000)

    const textTimeout = setTimeout(() => {
      setFadeText(false)

      setTimeout(() => {
        setTextIndex(prevIndex =>
          prevIndex >= texts.length - 1 ? 0 : prevIndex + 1,
        )
        setFadeCircle(true)
        setFadeText(true)
      }, TIME_TO_FADE)
    }, TIME_INTERVAL)

    return () => {
      clearTimeout(circleTimeout)
      clearTimeout(textTimeout)
    }
  }, [textIndex])

  return (
    <>
      <span
        className={`inline-flex text-red-300 items-center text-black duration-300 dark:text-red-500 ${
          fadeText ? 'opacity-100 translate-y-0' : 'translate-y-2 opacity-0'
        }`}
        key={textIndex}
      >
        {textToShow}{' '}
        <div
          className={`ml-2 h-3 w-3 rounded-full bg-black duration-300 bg-red-300 dark:bg-red-500 ${
            fadeCircle ? '' : 'h-0 w-0 opacity-0'
          }`}
        />
      </span>
    </>
  )
}
export default TextTypingEffectWithTextsFadeOut
