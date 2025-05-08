const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/User.model')


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


module.exports = {registerUser,loginUser,getUserInfo}