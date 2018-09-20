import Router from 'next/router'

const model = {
  namespace: 'router',
  state: {
    path: '/',
    key: ['1']
  },
  reducers: {
    setPath(state, { path }) {
      Router.replace(path)
      return { ...state, path }
    },
    updateKey(state, { key }) {
      let newKey = []
      newKey.push(key)
      return { ...state, key: newKey }
    }
  },
  effects: {
    *updatePath({ path }, { select, put }) {
      // let needToken = false
      // for (let p in urlsWithoutAuth) {
      //   if (urlsWithoutAuth[p] !== path) {
      //     needToken = true
      //     break
      //   }
      // }
      // let token = yield select(state => state.user.token)

      // if (needToken && token) {
        yield put({ type: 'setPath', path })
      // } else {
      //   yield put({ type: 'setPath', path: '/' })
      // }
    }
  }
}

const urlsWithoutAuth = ['/', '/login', '/register']

export default model
