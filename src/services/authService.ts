import { IAuthResponse } from './../contracts/v1/responses'
import { IUserDocument, IRefreshToken } from './../types/userType'
import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'
import mongoose from 'mongoose'

export async function generateTokens(
  user: IUserDocument,
  fingerPrint: string
): Promise<IAuthResponse> {
  const userId = user.id
  const { jwt, jwtId } = generateJwt(userId)
  const now = Math.floor(Date.now() / 1000)
  const tokenExp = process.env.JWT_REFRESH_EXPIRE
  const expiredAt = now + tokenExp * 24 * 60 * 60

  const newRefreshToken: IRefreshToken = {
    jwtId: jwtId,
    fingerPrint: fingerPrint,
    expiredAt: expiredAt,
    createdAt: now,
  }
  user.refreshTokens.push(newRefreshToken)
  const updatedUser = await user.save()
  if (!updatedUser) return null
  const refreshToken = updatedUser.refreshTokens.find((f) => f.jwtId)
  return { jwt, refreshToken: refreshToken._id }
}

export function generateJwt(userId: mongoose.Schema.Types.ObjectId) {
  const jwtId = uuid()
  const jwt = sign(
    {
      _id: userId.toString(),
      jti: jwtId,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  )
  return { jwt, jwtId }
}
