import { envVarsNames } from './../constants/constants'
import { IUserDocument, RefreshToken } from './../types/userType'
import { AuthResponse } from '../contracts/v1/responses'
import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'
import mongoose from 'mongoose'
import { tryToGetEnvVar } from '../utils/utils'

export default async function generateTokens(
  this: IUserDocument,
  fingerPrint: string
) {
  const user = this
  const userId = user.id
  const { jwt, jwtId } = generateJwt(userId)
  const now = Math.floor(Date.now() / 1000)
  const refreshTokenExp: number = tryToGetEnvVar(
    envVarsNames.JWT_REFRESH_EXPIRE
  ) as number
  const expiredAt = now + refreshTokenExp * 24 * 60 * 60

  const newRefreshToken = new RefreshToken(jwtId, fingerPrint, expiredAt, now)
  user.refreshTokens.push(newRefreshToken)

  const updatedUser = await user.save()
  const refreshToken = updatedUser.refreshTokens.find((f) => f.jwtId)
  //if (!refreshToken?._id) throw new Error('Saving refresh token error')

  return new AuthResponse(jwt, refreshToken?._id as string)
}

function generateJwt(userId: mongoose.Schema.Types.ObjectId) {
  const secret = tryToGetEnvVar(envVarsNames.JWT_ACCESS_KEY) as string
  const expiresIn = tryToGetEnvVar(envVarsNames.JWT_ACCESS_EXPIRE) as number

  const jwtId = uuid()
  const jwt = sign(
    {
      _id: userId.toString(),
      jti: jwtId,
    },
    secret,
    {
      expiresIn,
    }
  )
  return { jwt, jwtId }
}
