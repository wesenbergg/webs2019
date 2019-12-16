import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AncedoteList from './components/AnecdoteList'
import AncedoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  },[])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AncedoteList />
      <AncedoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)