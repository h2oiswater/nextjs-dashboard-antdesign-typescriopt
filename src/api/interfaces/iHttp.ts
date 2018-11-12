export default interface IHttp {
  delete(url: string, params?: object): Promise<any>
  get(url: string, params?: object): Promise<any>
  post(url: string, params: object): Promise<any>
  put(url: string, params: object): Promise<any>
}
