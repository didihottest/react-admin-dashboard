const express = require('express')
const ROUTER = express.Router()
const authController = require('../api/auth')

ROUTER.post('/signup', authController.signUp)
ROUTER.post('/login', authController.login)


module.exports = ROUTER