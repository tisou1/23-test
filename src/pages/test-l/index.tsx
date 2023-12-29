import React,{ useState } from 'react'
import { InputText } from 'primereact/inputtext' 

export default function TestApp1(props:any) {

  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setInputValue(e.target.value);
  }

  return (
    <div className="test-l">
      <p>test-l</p>
      <InputText value={inputValue} onChange={handleChange} className={props.calssname}/>
    </div>
  )
}