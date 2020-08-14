import express from 'express'
import { Request, Response } from 'express'
import routes from './routes/'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello')
})

app.post('/', (req, res) => {
  var x = req.body
  res.status(200).send(x)
})

routes.forEach((route) => {
  app[route.method](
    route.path,
    (req: Request, res: Response, next: Function) => {
      route
        .action(req, res)
        .then(() => next)
        .catch((err: any) => next(err))
    }
  )
})

export default app
