import { keys, get } from '../utils/localStorage'
import IHttp from './interfaces/ihttp'
import axios from './axioxBuilder'
import md5 from 'md5'
import { LEAN_API_KEY } from './constants'

export function getHeaders() {
  let timeStamp = new Date().getTime()
  let token = get(keys.KEY_TOKEN)
  return {
    'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
    'X-LC-Session': token
  }
}

class HttpClient implements IHttp {
  delete(url: string, params?: object): Promise<any> {
    return axios.delete(url, {
      params,
      headers: getHeaders()
    })
  }
  put(url: string, data: object): Promise<any> {
    return axios.put(url, data, {
      headers: getHeaders()
    })
  }
  get(url: string, params?: object): Promise<any> {
    return axios.get(url, {
      params,
      headers: getHeaders()
    })
  }
  post(url: string, data: object): Promise<any> {
    return axios.post(url, data, {
      headers: getHeaders()
    })
  }
}

const httpClient = new HttpClient()

export default httpClient
