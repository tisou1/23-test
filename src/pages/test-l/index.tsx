import React,{ useState ,useEffect, useRef} from 'react'

import { InputText } from 'primereact/inputtext' 

import { useCountdown, useCountdown2 } from '~/hooks'

export default function TestApp1(props:any) {
  const c = useRenderCount()
  const [inputValue, setInputValue] = useState('')

  const num = useCountdown2(3, () => console.log('定时结束执行'))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setInputValue(e.target.value);
  }

  return (
    <div className="test-l">
      <p>test-l</p>{c}
      <InputText value={inputValue} onChange={handleChange} className={props.calssname}/>
      <div>倒计时: {num}</div>
    </div>
  )
}


function useRenderCount() {
  const count = useRef(1);

  useEffect(() => {
    count.current += 1;
  });

  return count.current;
}
