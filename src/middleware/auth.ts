import { JwtDecoded, ReqCtx } from './../types/general'
import { tryToGetEnvVar } from './../utils/utils'
import { ErrorResponse } from './../contracts/v1/responses'
import { headers } from './../constants/constants'
import { verify } from 'jsonwebtoken'
import User from '../models/user/user'
import { Request, Response, NextFunction } from 'express'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const jwt = req.header(headers.authorization)?.replace('Bearer ', '')

  if (!jwt)
    return res.status(401).send(new ErrorResponse('Auth header required'))

  let decoded: JwtDecoded
  const jwtKey = tryToGetEnvVar('JWT_ACCESS_KEY') as string
  try {
    decoded = verify(jwt, jwtKey) as JwtDecoded
  } catch (e) {
    return res.status(401).send(new ErrorResponse('Invalid jwt token'))
  }
  const user = await User.findOne({
    _id: decoded._id,
  })

  if (!user) {
    return res.status(404).send(new ErrorResponse('User not found'))
  }

  req.authCtx = new ReqCtx(user, decoded.jti)
  next()
}

export default auth
