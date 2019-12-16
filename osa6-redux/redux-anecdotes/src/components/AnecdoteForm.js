import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'


const AncedoteForm = ({ store }) => {
  
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    store.dispatch(create(content))
    store.dispatch(show(content))
    store.dispatch(reset())
    e.target.anecdote.value = ''
    setTimeout(() => store.dispatch(hide()) , 5000)
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