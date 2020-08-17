import app from './app'
import db from './db/db'

const port = process.env.PORT || 3000

//const connection = db.
const connection = () => {
  return db.connect()
}

app.get('/disc', (req, res) => {
  db.disconnect(() => {
    console.log('disc')
  })
  res.status(200).send({})
})

connection()
  .on('error', () => console.log('error'))
  .on('disconnected', connection)
  .on('connected', () => console.log('connected'))
  .once('open', () => {
    app.listen(port, () => {
      console.log('App listening on port', port)
    })
  })
