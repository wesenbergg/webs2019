import React from 'react'
import { increment } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'

const AncedoteList = ({ store }) => {
  const anecdotesInit = store.getState().anecdotes
  //console.log(store.getState().filter)
  const anecdotes = anecdotesInit.filter(a => a.content.includes(store.getState().filter))

  const vote = (id, content) => {
    console.log('vote', id)
    store.dispatch(increment(id))
    store.dispatch(show(content))
    store.dispatch(reset())
    setTimeout(() => store.dispatch(hide()) , 5000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AncedoteList