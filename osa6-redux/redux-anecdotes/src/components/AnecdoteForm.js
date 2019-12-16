import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/notificationReducer'
import { reset } from '../reducers/filterReducer'


const AncedoteForm = (props) => {
  
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.create(content)
    props.show(content)
    props.reset()
    e.target.anecdote.value = ''
    setTimeout(() => props.hide() , 5000)
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

const mapDispatchToProps = { create, show, hide, reset }

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedAncedoteForm = connect(mapStateToProps, mapDispatchToProps)(AncedoteForm)
export default ConnectedAncedoteForm