import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'red',
  },
  highlighted: {
    color: 'rebeccapurple',
  },
})

console.log(styles)

export default function StyleX() {
  return (
    <div {...stylex.props(styles.base)}>stylex</div>
  )
}
