import * as goodsAPI from '../api/business/goodsAPI'
import Category from '../class/Category'
import Query from '../class/Query'
import Goods from '../class/Goods'
import { CategoryListRep, GoodsListRep } from '../class/goodsTypes'

const initialState = {
  goodsCount: 0,
  categoryCount: 0,
  currentCategory: {} as Category,
  currentGoods: {} as Goods,
  categoryList: [] as Array<Category>,
  goodsList: [] as Array<Goods>,
  categoryPage: 1,
  goodsPage: 1,
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
    updateGoodsList(state, { payload }) {
      return {
        ...state,
        goodsList: payload.results,
        goodsCount: payload.count,
        goodsPage: payload.goodsPage
      }
    },
    updateCurrentCategory(state, { payload }) {
      return { ...state, currentCategory: payload }
    },
    updateCurrentGoods(state, { payload }) {
      return { ...state, currentGoods: payload }
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

    *getGoodsList({ payload }, { select, call, put }) {
      let page = yield select(state => state.goods.goodsPage)

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
      let result: GoodsListRep = yield call(goodsAPI.goods, query)

      yield put({
        type: 'updateGoodsList',
        payload: { ...result, goodsPage: page }
      })
    },
    *createGoods(action: { payload: Goods }, { select, call, put }) {
      let currentGoods: Goods = yield select(
        state => state.goods.currentCategory
      )
      if (currentGoods.objectId) {
        let goods = {
          ...action.payload,
          objectId: currentGoods.objectId
        }
        yield call(goodsAPI.goodsCreate, goods)
      } else {
        yield call(goodsAPI.goodsCreate, action.payload)
      }
      yield put({ type: 'updateCurrentGoods', payload: {} })
      yield put({ type: 'getGoodsList' })
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
