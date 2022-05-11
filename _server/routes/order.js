const express = require('express')
const ROUTER = express.Router()
const orderController = require('../api/order')

ROUTER.post('/create', orderController.createOrder)
ROUTER.post('/list', orderController.getOrderList)
ROUTER.put('/update/:id', orderController.updateOrder)
ROUTER.get('/single/:id', orderController.getOrderById)
ROUTER.delete('/delete/:id', orderController.deleteOrder)


module.exports = ROUTER