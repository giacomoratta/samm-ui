import sammApi from '../sammApi';
// import history from '../history'

import {
  ERROR_CONFIGURATIONS,
  FETCH_CONFIGURATIONS,
  CHANGE_CONFIGURATION
} from './types'

export const fetchConfigurations = () => {
  return async (dispatch) => {
    try {
      const response = await sammApi.get('/config')
      dispatch({
        type: FETCH_CONFIGURATIONS,
        payload: response.data ? response.data.reduce(function(map, obj) {
          map[obj.id] = obj.value;
          return map;
        }, {}) : {}
      })
    } catch (error) {
      dispatch({
        type: ERROR_CONFIGURATIONS,
        error
      })
    }
  }
}

export const changeConfiguration = (id, value) => {
  return async (dispatch) => {
    try {
      const response = await sammApi.put(`/config/${id}`, { id, value })
      dispatch({
        type: CHANGE_CONFIGURATION,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: ERROR_CONFIGURATIONS,
        error
      })
    }
  }
}