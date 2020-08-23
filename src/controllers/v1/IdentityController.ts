import {
  IUserRegistrationRequest,
  ILoginRequest,
} from './../../contracts/v1/requests'
import { Request, Response } from 'express'
import User from '../../models/user'
import { ErrorResponse } from '../../contracts/v1/responses'

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

  const user = await User.findByCredentials(reqBody.email, reqBody.password)
  if (!user)
    return res
      .status(400)
      .send(new ErrorResponse('Incorrect email or password'))

  const refreshToken = user.refreshTokens.find(
    (f) => f.fingerPrint === reqBody.fingerPrint
  )
  if (!refreshToken)
    return res.status(400).send(new ErrorResponse('Incorrect fingerprint'))

  const authResult = await user.generateTokens(reqBody.fingerPrint)

  res.status(200).json(authResult)
}
