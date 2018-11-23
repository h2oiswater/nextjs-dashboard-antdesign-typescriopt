import IHttp, { RequestConfig, HTTP_METHODS } from './interfaces/IHttp'
import axios from './axioxBuilder'

class HttpClient implements IHttp {
  request(
    url: string,
    params?: object,
    config = { method: HTTP_METHODS.GET } as RequestConfig
  ): Promise<any> {
    return this._request(url, params, config)
  }

  private _request(
    url: string,
    params: object,
    config?: RequestConfig
  ): Promise<any> {
    return axios.request({
      url,
      method: config.method,
      data: params,
      headers: config.headers
    })
  }
}

const httpClient = new HttpClient()

export default httpClient
