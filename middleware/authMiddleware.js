const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("Auth Middleware Running...");
    const token = req.cookies.authToken;
    console.log("token is: " + token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // console.log("JWT_SECRET is: " + process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        console.log('User Authenticated');
        // console.log("userId is: " + req.userId);
        next();
    } catch (error) {
        console.error('Token is not valid:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
