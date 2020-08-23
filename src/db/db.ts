import { envVarsNames } from './../constants/constants'
import { tryToGetEnvVar } from './../utils/utils'
import mongoose from 'mongoose'

export default {
  connect: () => {
    mongoose.connect(tryToGetEnvVar(envVarsNames.DB_CONNECTION) as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    return mongoose.connection
  },
  disconnect: (done: () => void) => mongoose.disconnect(done),
}
