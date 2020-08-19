import { Document, Model } from 'mongoose'

export interface IRefreshToken {
  _id?: string
  jwtId: string
  fingerPrint: string
  expiredAt: number
  createdAt: number
}

export interface IUserDocument extends Document {
  email: string
  password: string
  refreshTokens: IRefreshToken[]
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (email: string, password: string) => Promise<IUserDocument>
}

export interface IUser {
  email: string
}
