import * as userAPI from '../api/business/userAPI'
import { AVUser } from 'src/class/Store'

const inititalState = {
  token: undefined as string,
  user: undefined as AVUser
}

export type UserState = Readonly<typeof inititalState>

const model = {
  namespace: 'user',
  state: inititalState,
  reducers: {
    updateUser(state, { payload }) {
      return { ...state, user: payload }
    }
  },
  effects: {
    *login({ payload }, { put, call }) {
      try {
        let result = yield call(userAPI.login, payload)
      } catch (error) {
        console.error(error)
      }
    },
    *me({}, { put, call }) {
      try {
        let user: AVUser = yield call(userAPI.me)
        yield put({
          type: 'updateUser',
          payload: user
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default model
