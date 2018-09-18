const model = {
  namespace: 'router',
  state: {
    path: '/',
    key: ['1']
  },
  reducers: {
    updatePath(state, path) {
      return { ...state, path }
    },
    updateKey(state, {key}) {
      console.log(key)
      let newKey = []
      newKey.push(key)
      return { ...state, key: newKey }
    }
  },
  effects: {
  },
  subscriptions: {
  }
}

export default model