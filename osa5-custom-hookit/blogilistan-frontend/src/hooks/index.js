import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  const inputField = {
    type,
    value,
    onChange
  }

  return {
    inputField,
    value,
    resetValue
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}