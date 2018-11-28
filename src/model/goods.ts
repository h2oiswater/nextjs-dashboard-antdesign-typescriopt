import * as goodsAPI from '../api/business/goodsAPI'
import Category from '../class/Category'
import Query from '../class/Query'
import Goods from '../class/Goods'
import { CategoryListRep } from '../class/goodsTypes'

const initialState = {
  categoryCount: 0,
  currentCategory: {},
  categoryList: [],
  categoryPage: 1,
  perPageSize: 10
}

export type GoodsState = Readonly<typeof initialState>

const model = {
  namespace: 'goods',
  state: initialState,
  reducers: {
    updateLoading(state, loading) {
      return { ...state, loading }
    },
    updateCategoryList(state, { payload }) {
      return {
        ...state,
        categoryList: payload.results,
        categoryCount: payload.count,
        categoryPage: payload.categoryPage
      }
    },
    updateCurrentCategory(state, { payload }) {
      return { ...state, currentCategory: payload }
    }
  },
  effects: {
    *getCategoryList({ payload }, { select, call, put }) {
      let page = yield select(state => state.goods.categoryPage)

      if (payload) {
        if (typeof payload === 'string' && payload === 'all') {
          page = -1
        } else {
          page = payload
        }
      }

      let pageSize = yield select(state => state.goods.perPageSize)
      let query: Query =
        page !== -1
          ? {
              limit: pageSize,
              skip: (page - 1) * pageSize
            }
          : {}
      let result: CategoryListRep = yield call(goodsAPI.category, query)

      yield put({
        type: 'updateCategoryList',
        payload: { ...result, categoryPage: page }
      })
    },
    *createGood( action: {payload: Goods} ) {
      
    },
    *createCategory(action: { payload: Category }, { select, call, put }) {
      let currentCategory = yield select(state => state.goods.currentCategory)
      if (currentCategory.objectId) {
        let category = {
          ...action.payload,
          objectId: currentCategory.objectId
        }
        yield call(goodsAPI.categoryUpdate, category)
      } else {
        yield call(goodsAPI.categoryCreate, action.payload)
      }
      yield put({ type: 'updateCurrentCategory', payload: {} })
      yield put({ type: 'getCategoryList' })
    },
    *deleteCategory(action: { payload: Category }, { call, put }) {
      yield call(goodsAPI.categoryDelete, action.payload)

      yield put({ type: 'getCategoryList' })
    }
  }
}

export default model
