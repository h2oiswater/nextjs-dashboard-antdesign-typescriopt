import { apiGet, apiPost, apiDelete, apiPut } from '../api'
// import { keys, set } from '../../utils/localStorage'
import Category from '../../class/Category'
import Goods from '../../class/Goods'
import Query from '../../class/Query'
import { CategoryListRep, GoodsListRep } from '../../class/goodsTypes'

const CLASS_CATEGORY_NAME = 'Category'
const CLASS_GOODS_NAME = 'Goods'

export function goodsCreate(data: Goods): Promise<any> {
  return apiPost({ url: `/classes/${CLASS_GOODS_NAME}`, params: data })
}

export function categoryCreate(data: Category): Promise<any> {
  return apiPost({ url: `/classes/${CLASS_CATEGORY_NAME}`, params: data })
}

export function categoryUpdate(data: Category): Promise<any> {
  return apiPut({
    url: `/classes/${CLASS_CATEGORY_NAME}/${data.objectId}`,
    params: data
  })
}

export function categoryDelete(data: Category): Promise<any> {
  return apiDelete({
    url: `/classes/${CLASS_CATEGORY_NAME}/${data.objectId}`,
    params: data
  })
}

export function category(data: Query): Promise<CategoryListRep> {
  data.class = CLASS_CATEGORY_NAME
  data.count = 1
  return apiGet<CategoryListRep>({
    url: `/classes/${CLASS_CATEGORY_NAME}`,
    params: data
  })
}

export function goods(data: Query): Promise<GoodsListRep> {
  data.class = CLASS_GOODS_NAME
  data.count = 1
  return apiGet<GoodsListRep>({
    url: `/classes/${CLASS_GOODS_NAME}`,
    params: data
  })
}
