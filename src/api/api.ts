import HttpClient from './iHttpImp'
import md5 from 'md5'
import { LEAN_API_KEY, LEAN_API_ID, BASE_API_URL } from './constants'
import { keys, get } from '../utils/localStorage'
import { HTTP_METHODS, RequestConfig } from './interfaces/iHttp'

export function getHeaders() {
  let timeStamp = new Date().getTime()
  let token = get(keys.KEY_TOKEN)
  return {
    'X-LC-Id': LEAN_API_ID,
    'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
    'X-LC-Session': token
  }
}
interface APIParams {
  url: string
  params?: any
  extra?: any
}

function _buildRequestConfig({
  method
}: {
  method: HTTP_METHODS
}): RequestConfig {
  return {
    headers: getHeaders(),
    method
  }
}

const errorHanding = err => {
  console.log('-------- error --------')
  console.error(err)
}

function _wrapperResponse<T>(data: any): T {
  console.log('-------- response --------')
  console.log(data)
  return data as T
}

export async function apiGet<T>(params: APIParams): Promise<T | undefined> {
  return _api<T>(params, HTTP_METHODS.GET)
}

export async function apiPost<T>(params: APIParams): Promise<T | undefined> {
  return _api<T>(params, HTTP_METHODS.POST)
}

export async function apiDelete<T>(params: APIParams): Promise<T | undefined> {
  return _api<T>(params, HTTP_METHODS.DELETE)
}

export async function apiPut<T>(params: APIParams): Promise<T | undefined> {
  return _api<T>(params, HTTP_METHODS.PUT)
}

async function _api<T>(params: APIParams, method: HTTP_METHODS) {
  console.log('-------- request start --------')
  console.log(params)
  console.log(method)
  console.log('-------- request end --------')
  try {
    let res = await HttpClient.request(
      BASE_API_URL.concat(params.url),
      params.params,
      _buildRequestConfig({ method })
    )
    return _wrapperResponse<T>(res.data)
  } catch (error) {
    errorHanding(error)
  }
}
