export default function Input(props) {
  return (
    <div className="si-input relative">
      <input
        type="text"
        className="peer p-3 border border-solid border-gray-300 rounded focus:border-red-300"
      />
      <label className="pointer-events-none absolute top-2 left-3 peer-focus:(-top-2 left-2 bg-white) transition-all duration-300">
        账号
      </label>
    </div>
  )
}
