import './Marquee.scss'

interface User {
  name: string
  image: string
}

interface MarqueeProps {
  users: User[]
  reverse: boolean
  dark: boolean
}

export default function Marquee(props: MarqueeProps) {
  const {
    users,
    reverse,
  } = props
  const colorScheme = props.dark ? 'light' : 'dark'

  return (
    <div>
      <div className="marquee-wrapper overflow-hidden flex">
        {Array(3)
          .fill(users)
          .map((users, index) => (
            <div key={index} className={`marquee${reverse ? ' marquee-reverse' : ''}`}>
              {users.map(user => (
                <div className="w-full" key={user.name}>
                  <img src={user.image} alt={`${user.name}-${colorScheme}`} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
