const express = require('express')
const ROUTER = express.Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const orderRoutes = require('./order')


ROUTER.use('/user', userRoutes)
ROUTER.use('/product', productRoutes)
ROUTER.use('/order', orderRoutes)

ROUTER.all('*', (req, res, next) => {
  res.status(404).json({
    error: 404,
    message: `Request URL ${req.path} Not Found`
  })
})

ROUTER.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    error: statusCode,
    message: err.message
  })
})

module.exports = ROUTER