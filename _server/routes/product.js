const express = require('express')
const ROUTER = express.Router()
const productController = require('../api/product')

ROUTER.post('/create', productController.createProduct)
ROUTER.post('/list', productController.getProductList)
ROUTER.get('/all', productController.getProductAll)
ROUTER.put('/update/:id', productController.updateProduct)
ROUTER.get('/single/:id', productController.getProductById)
ROUTER.delete('/delete/:id', productController.deleteProduct)


module.exports = ROUTER