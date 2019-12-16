import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { show } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'
import anecdoteService from '../services/anecdotes'


const AncedoteForm = (props) => {
  
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.create(content)
    props.show(`you created '${content}'`, 10)
    props.reset()
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

const mapDispatchToProps = { create, show, reset }

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedAncedoteForm = connect(mapStateToProps, mapDispatchToProps)(AncedoteForm)
export default ConnectedAncedoteForm