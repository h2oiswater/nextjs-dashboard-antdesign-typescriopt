const initialState = {
  currentStoreID: undefined as string
}

export type CommonState = typeof initialState

const model = {
  namespace: 'common',
  state: initialState,
  reducers: {
    updateCurrentStoreID(state, { payload }): CommonState {
      return { ...state, currentStoreID: payload }
    }
  },
  effects: {}
}

export default model
