import { Request, Response } from 'express'
import User from '../../models/user'
import { generateJwt } from '../../services/authService'

export async function registerAction(req: Request, res: Response) {
  const newUser = new User(req.body)
  const user = await newUser.save()
  if (!user) {
    res.send(400).send('Unable to register new user')
    return
  }
  const { jwt } = generateJwt(user.id)
  res.status(201).json({ user, jwt })
}
