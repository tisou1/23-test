import Remarking from '~/components/marking'

export default function App() {
  return (
    <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-3 px-4 sm:px-1 md:px-2 lg:px-4">
      <Remarking remark="80%" caption="正确率" percentage={20} />
    </div>
  )
}
