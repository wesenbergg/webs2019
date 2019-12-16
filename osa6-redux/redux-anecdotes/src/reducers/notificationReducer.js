const initialState = { type: 'hidden', message: 'If it hurts, do it more often' }

const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'SHOW':
      return { type: 'visible', message: action.data.content }
    case 'HIDE':
      return { ...state, type: 'hidden' }
    default:
    return state
  }
}

export const show = (content) => {
  return {
    type: 'SHOW',
    data: { content: content }
  }
}

export const hide = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer