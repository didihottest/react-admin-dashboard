require('dotenv').config()
const express = require('express')
const app = express()
const { sequelize } = require('./models')
const routes = require('./routes')
const cors = require('cors')

// cors agar bisa sharing data dengan aplikasi yang beda hostname atau domain
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routes
app.use(routes)

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is running at port " + process.env.PORT)
  })
}).catch((error) => {
  console.log('====================================');
  console.log(error);
  console.log('====================================');
})