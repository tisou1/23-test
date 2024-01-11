import React,{ useState ,useEffect, useRef} from 'react'

import { InputText } from 'primereact/inputtext' 

export default function TestApp1(props:any) {
  const c = useRenderCount()
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setInputValue(e.target.value);
  }

  return (
    <div className="test-l">
      <p>test-l</p>{c}
      <InputText value={inputValue} onChange={handleChange} className={props.calssname}/>
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
