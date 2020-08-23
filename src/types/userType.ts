import { AuthResponse } from './../contracts/v1/responses'
import { Document, Model } from 'mongoose'

export class RefreshToken {
  constructor(
    public jwtId: string,
    public fingerPrint: string,
    public expiredAt: number,
    public createdAt: number,
    public _id?: string
  ) {}
}

export interface IUserDocument extends Document {
  email: string
  password: string
  refreshTokens: RefreshToken[]
  generateTokens: (fingerPrint: string) => Promise<AuthResponse>
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (email: string, password: string) => Promise<IUserDocument>
}

export interface IUser {
  email: string
}
