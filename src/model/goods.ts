import * as goodsAPI from '../api/business/goodsAPI'
import Category from '../class/Category'
import Query from '../class/Query'

const model = {
  namespace: 'goods',
  state: {
    currentCategory: {},
    categoryList: [],
    categoryPage: 1,
    perPageSize: 10
  },
  reducers: {
    updateLoading(state, loading) {
      return { ...state, loading }
    },
    updateCategoryList(state, { payload }) {
      return { ...state, categoryList: payload }
    },
    updateCurrentCategory(state, { payload }) {
      return { ...state, currentCategory: payload }
    }
  },
  effects: {
    *getCategoryList({}, { select, call, put }) {
      let page = yield select(state => state.goods.categoryPage)
      let pageSize = yield select(state => state.goods.perPageSize)
      let query: Query = {
        limit: pageSize,
        skip: (page - 1) * pageSize
      }
      let result = yield call(goodsAPI.category, query)
      yield put({ type: 'updateCategoryList', payload: result.results })
    },
    *createCategory(action: { payload: Category }, { select, call, put }) {
      let currentCategory = yield select(state => state.goods.currentCategory)
      console.log(currentCategory)
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
      console.log(action.payload)
      yield call(goodsAPI.categoryDelete, action.payload)

      yield put({ type: 'getCategoryList' })
    }
  }
}

export default model
