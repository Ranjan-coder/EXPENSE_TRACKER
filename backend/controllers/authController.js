const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/User.model')
// cloudinary setup
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Generate Jwt Token 
const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, { expiresIn: '1h' })

}

// Register User 
const registerUser = async (req, res) =>{
    const { fullName, email, password, profileImageUrl } = req.body;

    // validation checks for missing fields 

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        // check if email already exists 
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({message : 'Email Already in use'})
        }

        // Create the User 

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    }
    catch (err) {
        res.status(500).json({message: 'Error registering user', error : err.message});


    }
}

// Login User 
const loginUser = async (req, res) =>{
    const { email,password } = req.body

    if(!email || !password ) {
        return res.status(400).json({message: 'All fields are required'});
    }

    try {
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: 'invalid credentials'})

        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }
    catch (err) {
        res.status(500).json({message: 'Error login user', error : err.message});
    }
}

// User Info 
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user info if found
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: 'Error finding user', error: err.message });
    }
};


// image upload locally
// const uploadImage = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
// };




const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const localFilePath = path.join(__dirname, '../uploads', req.file.filename);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'your_folder_name', // Optional: set your preferred folder in Cloudinary
    });

    // Delete local file after successful upload
    fs.unlink(localFilePath, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    // Send response
    res.status(200).json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ message: 'Image upload failed', error });
  }
};


module.exports = {registerUser,loginUser,getUserInfo,uploadImage}