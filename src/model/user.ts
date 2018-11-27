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
      try {
        let result = yield call(userAPI.login, payload)
        console.log(result)
      } catch (e) {
        console.log(e.toString())
      }
    }
  }
}

export default model
