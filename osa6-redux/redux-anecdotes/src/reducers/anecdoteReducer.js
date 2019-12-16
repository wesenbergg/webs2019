import anecdoteService from '../services/anecdotes'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)*/

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'CREATE':
      //console.log(action.data)
      return [...state, action.data]
    case 'VOTE':
      const newList = state.map(a => a.id !== action.data.id ? a : action.data )
      return newList.sort( (a, b) => b.votes - a.votes )
    case 'INIT':
      console.log(action.data)
      return action.data
    default:
    return state
  }
}

export const increment = (object) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(object.id, {...object, votes: object.votes+1})
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const create = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log('response')
    console.log(anecdotes)
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default reducer