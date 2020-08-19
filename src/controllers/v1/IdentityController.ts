import {
  IUserRegistrationRequest,
  ILoginRequest,
} from './../../contracts/v1/requests'
import { Request, Response } from 'express'
import User from '../../models/user'
import { generateTokens } from '../../services/authService'

export async function registerAction(req: Request, res: Response) {
  const reqBody = req.body as IUserRegistrationRequest
  const newUser = new User(reqBody)
  const user = await newUser.save()
  if (!user) {
    res.send(400).send('Unable to register new user')
    return
  }
  const authResult = await generateTokens(user, reqBody.fingerPrint)
  res.status(201).json(authResult)
}

export async function loginAction(req: Request, res: Response) {
  const reqBody = req.body as ILoginRequest
  const user = await User.findByCredentials(reqBody.email, reqBody.password)
  const authResult = await generateTokens(user, reqBody.fingerPrint)
  res.status(200).json(authResult)
}
