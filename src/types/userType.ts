import mongoose from 'mongoose'

export interface IRefreshToken {
  _id?: string
  jwtId: string
  fingerPrint: string
  expiredAt: number
  createdAt: number
}

export interface IUser extends mongoose.Document {
  email: string
  password: string
  refreshTokens: IRefreshToken[]
}
