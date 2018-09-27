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
      let result = yield call(userAPI.login, payload)
      console.log(result)
    }
  }
}

export default model
