import React from 'react'
import AncedoteList from './components/AnecdoteList'
import AncedoteForm from './components/AnecdoteForm'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AncedoteList store={props.store} />
      <AncedoteForm store={props.store} />
    </div>
  )
}

export default App