const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const JWT_SECRET = process.env.JWT_SECRET



const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Attach user to request object, excluding password
            req.user = await User.findById(decoded.id).select("-password");

            // Continue to the next middleware
            next();

        } catch (err) {
            return res.status(401).json({ message: "Token invalid or expired" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };


// this is correct above one more structured 

// const protect = async (req, res, next) =>{
//     let token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({message: 'Not authorized, no token'})

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET)
//         req.user = await User.findById(decoded.id).select('-password')
//         next();

//     } catch (err) {
//         res.status(401).json({message: 'Authorization failed, token failed'})
//     }
// }

// module.exports = { protect } 
