import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = { type: 'DO_NOTHING' }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = { type: 'GOOD' }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 })
  })

  test('all is incremented, then reset to zero', () => {
    const actionO = { type: 'OK' }
    const state = initialState

    deepFreeze(state)
    const okState = counterReducer(state, actionO)
    expect(okState).toEqual({ good: 0, ok: 1, bad: 0 })
  })

  test('increment bad', () => {
    const actionB = { type: 'BAD' }
    const state = initialState

    deepFreeze(state)
    const badState = counterReducer(state, actionB)
    expect(badState).toEqual({ good: 0, ok: 0, bad: 1 })
  })

  test('reset to zero', () => {
    const actionZ = { type: 'ZERO' }
    const state = { good: 42, ok: 999999, bad: 1241 }

    deepFreeze(state)
    const zeroState = counterReducer(state, actionZ)
    expect(zeroState).toEqual({ good: 0, ok: 0, bad: 0 })
  })
})