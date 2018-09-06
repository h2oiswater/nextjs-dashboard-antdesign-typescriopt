import IHttp from './interfaces/ihttp'
import axios from './axioxBuilder'

class HttpClient implements IHttp {
  get (url: string, params?: any): Promise<any> {
    return axios.get(url, { params }).then(data => {return data.data})
  }
  post (url: string, data: any): Promise<any> {
    return axios.post(url, data)
  }
}

const httpClient = new HttpClient()

export default httpClient