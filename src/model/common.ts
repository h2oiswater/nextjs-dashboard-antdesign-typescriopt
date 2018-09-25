const model = {
  namespace: 'common',
  state: {
    loading: false,
    msg: 'hello'
  },
  reducers: {
    updateLoading(state, loading) {
      return { ...state, loading }
    },
    updateMsg(state, payload) {
      return { ...state, msg: payload.msg }
    }
  },
  effects: {}
}

export default model
