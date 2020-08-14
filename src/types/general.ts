export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
export interface AppRoute {
  path: string
  method: HttpMethod
  action: Function
}
