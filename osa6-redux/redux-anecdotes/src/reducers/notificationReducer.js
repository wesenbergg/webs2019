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

export const show = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: { content: content }
    })
    setTimeout(() => dispatch({
      type: 'HIDE'
    }), time*1000)
  }
}

export default reducer