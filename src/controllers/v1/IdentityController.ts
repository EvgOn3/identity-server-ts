import { LoginResponse } from './../../contracts/v1/responses'
import {
  IUserRegistrationRequest,
  ILoginRequest,
} from './../../contracts/v1/requests'
import { Request, Response, NextFunction } from 'express'
import User from '../../models/user/user'
import { ErrorResponse } from '../../contracts/v1/responses'
import auth from '../../middleware/auth'

export async function registerAction(req: Request, res: Response) {
  const reqBody = req.body as IUserRegistrationRequest
  if (!reqBody.email)
    return res.status(400).send(new ErrorResponse('Email is required'))
  if (!reqBody.password || reqBody.password.length < 2)
    /* TODO */
    return res.status(400).send(new ErrorResponse('Password to ez'))
  if (!reqBody.fingerPrint)
    return res.status(400).send(new ErrorResponse('Bad request'))

  const user = await User.findOne({ email: reqBody.email })
  if (user) return res.status(400).send(new ErrorResponse('Email already used'))

  const newUser = await new User(reqBody).save()
  const authResult = await newUser.generateTokens(reqBody.fingerPrint)

  res.status(201).json(authResult)
}

export async function loginAction(req: Request, res: Response) {
  const reqBody = req.body as ILoginRequest
  if (!reqBody.password)
    return res.status(400).send(new ErrorResponse('Password is required'))

  if (!reqBody.fingerPrint)
    return res.status(400).send(new ErrorResponse('Incorrect fingerprint'))

  const user = await User.findByCredentials(reqBody.email, reqBody.password)
  if (!user)
    return res
      .status(400)
      .send(new ErrorResponse('Incorrect email or password'))

  // user.refreshTokens = user.refreshTokens.filter(
  //   (f) => f.fingerPrint !== reqBody.fingerPrint
  // )

  // await user.save()

  const authResult = await user.generateTokens(reqBody.fingerPrint)
  const loginResult = new LoginResponse(
    user,
    authResult.jwt,
    authResult.refreshToken
  )

  res.status(200).json(loginResult)
}

export async function logoutAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await auth(req, res, next)
  const authUser = req.authCtx.user
  console.log(authUser.refreshTokens)
  authUser.refreshTokens = authUser.refreshTokens.filter(
    (f) => f.jwtId !== req.authCtx.jwtId
  )
  console.log(authUser.refreshTokens)
  const result = await authUser.save()
  res.status(200).send({})
  // const refreshToken = await RefreshToken.deleteOne({ jwtId: req.jwtId })
}
