const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, getUserInfo, uploadImage } = require('../controllers/authController')
const upload = require('../middleware/uploadMiddleware')


router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/getUser',protect,getUserInfo)


// Upload image route
router.post('/uploadImage', upload.single('image'), uploadImage);


// image upload 

// router.post('/uploadImage', upload.single('image'), (req, res) =>{
//     if (!req.file) {
//         return res.status(400).json({message : 'No file uploaded'})
//     }
//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
//         req.file.filename
//     }`;
//     res.status(200).json({imageUrl})
// })

module.exports = router