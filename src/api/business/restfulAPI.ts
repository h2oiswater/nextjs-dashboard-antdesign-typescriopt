import { apiGet, apiPost, apiDelete, apiPut } from '../api'
import Query from '../../class/Query'

export function rstPost(data: any, className: string): Promise<any> {
  return apiPost({ url: `/classes/${className}`, params: data })
}

export function rstPut(data: any, className: string): Promise<any> {
  return apiPut({
    url: `/classes/${className}/${data.objectId}`,
    params: data
  })
}

export function rstDelete(data: any, className: string): Promise<any> {
  return apiDelete({
    url: `/classes/${className}/${data.objectId}`
  })
}

export function rstGet<T>(data: Query, className: string): Promise<T> {
  data.count = 1
  return apiGet<T>({
    url: `/classes/${className}`,
    params: data
  })
}
