const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    // Extract the token from the 'Authorization' header (Bearer <token>)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Assuming userId is stored in the token

        // Fetch the user from the database using the userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the user object to the request for further use in the controller
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        if (req.user.role === 'user') { // Check if the role is 'user'
            next();
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    });
};

// Add this new middleware for admin verification
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Check if the user exists and has admin role
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ 
                success: false,
                message: 'Admin access required'
            });
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };