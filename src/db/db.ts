import mongoose from 'mongoose'

export default {
  connect: () => {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    return mongoose.connection
  },
  disconnect: (done: () => void) => mongoose.disconnect(done),
}
