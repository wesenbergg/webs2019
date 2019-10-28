import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [suurin, setSuurin] = useState(-1)

  const handleVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        setSuurin(votes.indexOf(Math.max(...votes)))
  }

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
    setSuurin(votes.indexOf(Math.max(...votes)))
  }

  return (
    <>
    <Anecdote title={"Anecdote of the day"}
     selected={selected} votes={votes} anecdotes={props.anecdotes}/>
    <Buttons handleNext={handleNext} handleVote={handleVote}/>
    <Anecdote title={"Anecdote with most votes"}
     selected={suurin} votes={votes} anecdotes={props.anecdotes}/>
    </>
  )
}

const Buttons = props => {
  return(
    <>
    <button onClick={props.handleNext}>next anecdote</button>
    <button onClick={props.handleVote}>vote</button>
    </>
  )
}

const Anecdote = props => {
  if(props.selected === -1) {
    return(
      <>
      <h2>{props.title}</h2>
      <p>null</p>
      </>
    )
  }
  
  return(
    <>
    <h2>{props.title}</h2>
    <p>{props.anecdotes[props.selected]}</p>
    <p>has {props.votes[props.selected]} votes</p>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)