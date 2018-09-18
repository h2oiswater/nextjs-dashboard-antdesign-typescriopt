export default interface IHttp {
  get (url: string, params?: any): Promise<any>
  post (url: string, params: any): Promise<any>
}