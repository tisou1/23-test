import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '~/utils/db'

export default function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(18)
  const [status, setStatus] = useState('')

  const friends = useLiveQuery(() => db.friends.toArray())

  const addFriend = async () => {
    try {
      const id = await db.friends.add({
        name,
        age,
      })

      setStatus(`Friend ${name} successfully added. Got id ${id}`)
      setName('')
      setAge(18)
    }
    catch (error) {
      setStatus(`Failed to add ${name}: ${error}`)
    }
  }

  return (
    <div>
      <p>
        {status}
      </p>
      Name:
      <InputText
        type="text"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      Age:
      <InputNumber
        type="number"
        value={age}
        onChange={ev => setAge(Number(ev.target.value))}
      />

      <Button onClick={addFriend}>
        Add
      </Button>

      <div className="list border border-blue-100">
        {
          friends?.map(friend => (
            <li key={friend.id}>
              {friend.name}
              {' '}
              {friend.age}
            </li>
          ))
        }
      </div>
    </div>
  )
}
