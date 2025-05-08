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
