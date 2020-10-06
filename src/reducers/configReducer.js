import {
  ERROR_CONFIGURATIONS,
  FETCH_CONFIGURATIONS,
  CHANGE_CONFIGURATION
} from '../actions/types'

export default (state = {}, action) => {
  if ( action.type === ERROR_CONFIGURATIONS ) {
    console.error(ERROR_CONFIGURATIONS, action.error)
    return { ...state, lastError: action.error }
  }
  if ( action.type === FETCH_CONFIGURATIONS ) {
    return { ...state, lastError: undefined, ...action.payload }
  }
  if ( action.type === CHANGE_CONFIGURATION ) {
    const newState = { ...state, lastError: undefined }
    newState[action.payload.id] = action.payload.value
    return newState
  }
  return state
}
