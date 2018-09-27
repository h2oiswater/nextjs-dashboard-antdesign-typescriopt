export default interface IHttp {
  delete(url: string, params?: any): Promise<any>
  get(url: string, params?: any): Promise<any>
  post(url: string, params: any): Promise<any>
  put(url: string, params: any): Promise<any>
}
