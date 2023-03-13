import './index.scss'

export default function Bg(params) {
  const handleCLick = () => {
    const dom = document.querySelector('#dom canvas')
    dom?.classList.toggle('no-bg')
  }

  return (
    <div className="w-500 h-600" id="dom">
      <canvas className="w-500 h-600"></canvas>
      <button onClick={handleCLick}>切换</button>
    </div>
  )
}
