import { keys, get } from '../utils/localStorage'
import IHttp from './interfaces/ihttp'
import axios from './axioxBuilder'
import md5 from 'md5'
import { LEAN_API_KEY } from './constants'

class HttpClient implements IHttp {
  delete(url: string, params?: any): Promise<any> {
    let timeStamp = new Date().getTime()
    let token = get(keys.KEY_TOKEN)
    return axios.delete(url, {
      params,
      headers: {
        'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
        'X-LC-Session': token
      }
    })
  }
  put(url: string, data: any): Promise<any> {
    let timeStamp = new Date().getTime()
    let token = get(keys.KEY_TOKEN)
    return axios.put(url, data, {
      headers: {
        'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
        'X-LC-Session': token
      }
    })
  }
  get(url: string, params?: any): Promise<any> {
    let timeStamp = new Date().getTime()
    let token = get(keys.KEY_TOKEN)
    return axios.get(url, {
      params,
      headers: {
        'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
        'X-LC-Session': token
      }
    })
  }
  post(url: string, data: any): Promise<any> {
    let timeStamp = new Date().getTime()
    let token = get(keys.KEY_TOKEN)
    return axios.post(url, data, {
      headers: {
        'X-LC-Sign': md5(timeStamp + LEAN_API_KEY) + ',' + timeStamp,
        'X-LC-Session': token
      }
    })
  }
}

const httpClient = new HttpClient()

export default httpClient
