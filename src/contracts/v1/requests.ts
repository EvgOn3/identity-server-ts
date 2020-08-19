export interface ILoginRequest {
  email: string
  fingerPrint: string
  password: string
}

export interface IUserRegistrationRequest extends ILoginRequest {}
