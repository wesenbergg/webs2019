import React from 'react'
import { change } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(change(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={store.getState().filter} onChange={handleChange} />
    </div>
  )
}

export default Filter