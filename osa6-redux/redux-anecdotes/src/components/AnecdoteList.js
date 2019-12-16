import React from 'react'
import { connect } from 'react-redux'
import { increment } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'

const AncedoteList = (props) => {
  /*const anecdotesInit = props.anecdotes
  //console.log(store.getState().filter)
  const anecdotes = anecdotesInit.filter(a => a.content.includes(props.filter))*/

  const vote = (id, content) => {
    console.log('vote', id)
    props.increment(id)
    props.show(content)
    props.reset()
    setTimeout(() => props.hide() , 5000)
  }

  return (
    <>
      {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) =>
   anecdotes.filter(a => a.content.includes(filter))


const mapDispatchToProps = {
  increment,
  show,
  reset,
  hide
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const ConnectedAncedotes = connect(mapStateToProps, mapDispatchToProps)(AncedoteList)
export default ConnectedAncedotes