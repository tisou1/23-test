import Marquee from '~/components/Marquee'

export default function App() {
  const usersData = ['fox', 'airbus', 'mercedes', 'ebay', 'ford', 'vw', 'intel', 'unicredit', 'lufthansa', 'nvidia', 'verizon', 'amex']

  const getUsersImages = () =>
    usersData.map(name => ({
      name,
      image: `https://primefaces.org/cdn/primereact/images/landing-new/whouses/${name}-dark.svg`,
    }))

  const usersImages = getUsersImages()
  const users1 = usersImages.slice(0, 6)
  const users2 = usersImages.slice(6)

  return (
    <div>
      <Marquee users={users1} />
    </div>
  )
}
