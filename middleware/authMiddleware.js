const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("authMiddleware.js");
    const token = req.cookies.authToken; // Access the 'authToken' cookie directly
    console.log("token is: " + token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        console.log("userId is: " + req.userId);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
