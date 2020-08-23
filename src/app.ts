import { ErrorResponse } from './contracts/v1/responses'
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import routes from './routes/'
import helmet from 'helmet'

const app = express()

app.use(express.json())
app.use(helmet())
//app.use(cors())

routes.forEach((route) => {
  app[route.method](
    route.path,
    (req: Request, res: Response, next: NextFunction) => {
      route
        .action(req, res)
        .then(() => next)
        .catch((err: any) => next(err))
    }
  )
})

export default app
