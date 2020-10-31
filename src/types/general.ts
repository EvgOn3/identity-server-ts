import { IUserDocument } from './userType'
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type EnvVarName =
  | 'JWT_ACCESS_KEY'
  | 'DB_CONNECTION'
  | 'JWT_REFRESH_EXPIRE'
  | 'JWT_ACCESS_EXPIRE'
  | 'PORT'
export interface AppRoute {
  path: string
  method: HttpMethod
  preAction?: Function
  action: Function
}

export interface JwtDecoded {
  _id: string
  jti: string
}

export class ReqCtx {
  constructor(public user: IUserDocument, public jwtId: string) {}
}
