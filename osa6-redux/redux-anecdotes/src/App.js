import React from 'react'
import AncedoteList from './components/AnecdoteList'
import AncedoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
//
const App = (props) => {
  return (
    <div>
      <Notification store={props.store} />
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      <AncedoteList store={props.store} />
      <AncedoteForm store={props.store} />
    </div>
  )
}

export default App