import * as restfulAPI from '../api/business/restfulAPI'
import Query from '../class/Query'
const MODEL_NAME = 'api'
const initialState = {
  perPageSize: 10
}

export type GoodsState = Readonly<typeof initialState>

const model = {
  namespace: MODEL_NAME,
  state: initialState,
  reducers: {
    update(state, data) {
      return { ...state, data }
    },
    updateList(state, { payload }) {
      let result = { ...state }
      result[payload.className + 'List'] = payload.results
      result[payload.className + 'Count'] = payload.count
      result[payload.className + 'Page'] = payload.page
      return result
    },
    updateCurrent(state, { payload }) {
      let result = { ...state }
      result[payload.className + 'Current'] = payload.params
      return result
    },
  },
  effects: {
    *getList(
      {
        payload
      }: { payload: { className: string; params: any; query?: Query } },
      { select, call, put }
    ) {
      let page = yield select(
        state => state[MODEL_NAME][payload.className + 'Page']
      )

      if (!page) {
        page = 1
      }

      if (payload.params) {
        if (typeof payload.params === 'string' && payload.params === 'all') {
          page = -1
        } else {
          page = payload.params
        }
      }

      let pageSize = yield select(state => state[MODEL_NAME].perPageSize)

      let pQuery: Query
      if (payload.query) {
        pQuery =
          page !== -1
            ? {
                ...payload.query,
                limit: pageSize,
                skip: (page - 1) * pageSize
              }
            : { ...payload.query }
      } else {
        pQuery =
          page !== -1
            ? {
                limit: pageSize,
                skip: (page - 1) * pageSize
              }
            : {}
      }

      let result = yield call(restfulAPI.rstGet, pQuery, payload.className)

      yield put({
        type: 'updateList',
        payload: { ...result, page, className: payload.className }
      })
    },
    *create(
      { payload }: { payload: { className: string; params: any } },
      { select, call, put }
    ) {
      let currentData = yield select(
        state => state[MODEL_NAME][payload.className + 'Current']
      )
      if (currentData && currentData.objectId) {
        let data = {
          ...payload.params,
          objectId: currentData.objectId
        }
        yield call(restfulAPI.rstPut, data, payload.className)
      } else {
        yield call(restfulAPI.rstPost, payload.params, payload.className)
      }
      yield put({
        type: 'updateCurrent',
        payload: { params: {}, className: payload.className }
      })
      yield put({ type: 'getList', payload: { className: payload.className } })
    },
    *delete(
      { payload }: { payload: { className: string; params: any } },
      { call, put }
    ) {
      yield call(restfulAPI.rstDelete, payload.params, payload.className)

      yield put({ type: 'getList', payload: { className: payload.className } })
    }
  }
}

export type MODEL_API = Readonly<typeof model>

export default model
