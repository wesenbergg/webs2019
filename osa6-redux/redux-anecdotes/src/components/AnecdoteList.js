import React from 'react'
import { connect } from 'react-redux'
import { increment } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'

const AncedoteList = (props) => {
  /*const anecdotesInit = props.anecdotes
  //console.log(store.getState().filter)
  const anecdotes = anecdotesInit.filter(a => a.content.includes(props.filter))*/

  const vote = (anecdote) => {
    props.increment(anecdote)
    props.show(`you voted '${anecdote.content}'`, 5)
    props.reset()
    //setTimeout(() => props.hide() , 5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
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
  reset
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const ConnectedAncedotes = connect(mapStateToProps, mapDispatchToProps)(AncedoteList)
export default ConnectedAncedotes