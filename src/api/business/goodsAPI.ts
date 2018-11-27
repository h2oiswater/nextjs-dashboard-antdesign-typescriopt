import { apiGet, apiPost, apiDelete, apiPut } from '../api'
// import { keys, set } from '../../utils/localStorage'
import Category from '../../class/Category'
import Query from '../../class/Query'
import { CategoryListRep } from '../../class/goodsTypes'

const CLASS_CATEGORY_NAME = 'Category'

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
