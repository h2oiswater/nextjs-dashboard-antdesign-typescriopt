import * as types from '../actionTypes'
/**
 * state
 */
export const state = {
  loading: false,
  msg: 'hello'
}

/**
 * actions
 */
export function updateLoading (b: boolean) {
  return {
    type: types.COMMON_LOADING,
    data: b
  }
}

/**
 * reducer
 */
export const reducer = (commonState = state, action) => {
  switch (action.type) {
    case types.COMMON_LOADING:
      return Object.assign({}, commonState, {
        loading: action.data
      })
      break
  }
  return commonState
}