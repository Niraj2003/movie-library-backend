const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("Auth Middleware Running...");
    // Access cookies from headers
    const authorizationHeader = req.headers.Authorization || req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authorizationHeader.split(' ')[1];
    console.log("token is: " + token);
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
