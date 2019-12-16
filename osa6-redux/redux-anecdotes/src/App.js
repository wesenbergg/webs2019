import React from 'react'
import AncedoteList from './components/AnecdoteList'
import AncedoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
//
const App = (props) => {
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

export default App