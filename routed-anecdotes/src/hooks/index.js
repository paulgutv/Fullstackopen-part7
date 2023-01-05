import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event, action) => {
    if (action === 'reset') {
      setValue('')
    }
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}