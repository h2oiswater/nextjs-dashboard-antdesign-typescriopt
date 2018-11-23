export default interface IHttp {
  request(url, params, config): Promise<any>
}

export enum HTTP_METHODS {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
  PUT = 'PUT'
}

export interface RequestConfig {
  // header
  headers?: any
  // 是否允许跨域
  allowCros?: boolean
  jsonp?: string
  method?: HTTP_METHODS
}
