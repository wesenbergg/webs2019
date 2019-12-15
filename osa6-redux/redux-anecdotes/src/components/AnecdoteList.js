import React from 'react'
import { increment } from '../reducers/anecdoteReducer'

const AncedoteList = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(increment(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AncedoteList