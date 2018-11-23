import { apiGet } from '../api'
// import { keys, set } from '../../utils/localStorage'
import Category from '../../class/Category'
import Query from '../../class/Query'

const CLASS_CATEGORY_NAME = 'Category'

export function categoryCreate(data: Category): Promise<any> {
  return HttpClient.post(`/classes/${CLASS_CATEGORY_NAME}`, data).then(data => {
    return data.data
  })
}

export function categoryUpdate(data: Category): Promise<any> {
  return HttpClient.put(
    `/classes/${CLASS_CATEGORY_NAME}/${data.objectId}`,
    data
  ).then(data => {
    return data.data
  })
}

export function categoryDelete(data: Category): Promise<any> {
  return HttpClient.delete(
    `/classes/${CLASS_CATEGORY_NAME}/${data.objectId}`,
    data
  ).then(data => {
    return data.data
  })
}

export function category(data: Query): Promise<Array<Category>> {
  data.class = CLASS_CATEGORY_NAME
  data.count = 1
  return apiGet<Array<Category>>({
    url: `/classes/${CLASS_CATEGORY_NAME}`,
    params: data
  })
}
