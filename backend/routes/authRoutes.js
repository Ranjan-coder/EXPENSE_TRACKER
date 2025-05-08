const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getuserInfo } = require('../controllers/authController')

router.post('/register',registerUser)

router.post('/login',loginUser)

// router.post('/getUser',protect,getuserInfo)

module.exports = router