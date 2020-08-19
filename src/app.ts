import { ErrorResponse } from './contracts/v1/responses'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
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
    (req: Request, res: Response, next: NextFunction) => {
      route
        .action(req, res)
        .then(() => next)
        .catch((err: ErrorResponse) => next(err))
    }
  )
})

app.use(
  (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code).json(err.message)
  }
)

export default app
