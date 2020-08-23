import { IUser } from './../../types/userType'

export class AuthResponse {
  constructor(public jwt: string, public refreshToken: string) {}
}

export class LoginResponse extends AuthResponse {
  constructor(public user: IUser, jwt: string, refreshToken: string) {
    super(jwt, refreshToken)
  }
}

export class ErrorResponse {
  constructor(public error: string) {}
}
