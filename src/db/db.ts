import mongoose from 'mongoose'

const mongoDb = {
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

export default mongoDb
