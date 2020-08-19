import { IUser } from './../../types/userType'

export interface IAuthResponse {
  jwt: string
  refreshToken: string
}

export interface ILoginResponse extends IAuthResponse {
  user: IUser
}

export class ErrorResponse extends Error {
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}
