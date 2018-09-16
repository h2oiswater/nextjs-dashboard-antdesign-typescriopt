import { combineReducers } from 'redux'

import { reducer as common } from './modules/common'

const rootReducer = combineReducers({
  common
})

export default rootReducer