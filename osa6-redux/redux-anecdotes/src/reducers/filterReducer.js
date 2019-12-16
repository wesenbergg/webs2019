const initialState = ''

const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'CHANGE':
      return action.data.filter
    case 'RESET':
      return initialState
    default:
    return state
  }
}

export const change = (filter) => {
  return {
    type: 'CHANGE',
    data: { filter: filter }
  }
}

export const reset = () => {
  return { type: 'RESET' }
}

export default reducer