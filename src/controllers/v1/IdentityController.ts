import { Request, Response } from 'express'

export async function registerAction(req: Request, res: Response) {
  res.status(201).json({ register: 'register' })
}
