const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, getUserInfo, uploadImage } = require('../controllers/authController')

// if cloudinary added then comment this 
const upload = require('../middleware/uploadMiddleware')

// For cloudinary 
// const multer = require('multer');
// const storage = require('../middleware/cloudinaryStorage');
// const upload = multer({ storage });



router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/getUser',protect,getUserInfo)


// Upload image route
router.post('/uploadImage', upload.single('image'), uploadImage);



module.exports = router