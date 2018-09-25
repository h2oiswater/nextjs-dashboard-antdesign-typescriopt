import * as userAPI from '../api/business/userAPI'

const model = {
  namespace: 'user',
  state: {
    token: ''
  },
  reducers: {},
  effects: {
    *login({ payload }, { put, call }) {
      console.log(payload)
      yield call(userAPI.login, {})
      yield put({ type: 'add' })
    }
  }
}

export default model
