import { envVarsNames } from './constants/constants'
import { tryToGetEnvVar } from './utils/utils'
import app from './app'
import db from './db/db'

const port = tryToGetEnvVar(envVarsNames.PORT) as number

const connection = () => {
  return db.connect()
}

connection()
  .on('error', () => console.log('error'))
  .on('disconnected', connection)
  .on('connected', () => console.log('connected'))
  .once('open', () => {
    app.listen(port, () => {
      console.log('App listening on port', port)
    })
  })
