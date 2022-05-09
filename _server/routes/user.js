const express = require('express')
const ROUTER = express.Router()
const userController = require('../api/user')

ROUTER.post('/create', userController.createUser)
ROUTER.post('/list', userController.getUserList)
ROUTER.put('/update/:id', userController.updateUser)
ROUTER.get('/single/:id', userController.getUserById)
ROUTER.delete('/delete/:id', userController.deleteUser)


module.exports = ROUTER