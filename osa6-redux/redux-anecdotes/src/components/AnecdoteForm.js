import React from 'react'
import { create } from '../reducers/anecdoteReducer'

const AncedoteForm = ({ store }) => {
  
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    store.dispatch(create(content))
    e.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AncedoteForm