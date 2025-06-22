const jwt = require('jsonwebtoken');



const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token) {
        return res.status(401).json({ success:false ,message: 'Unauthorized access, Login first' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success:false ,message: 'Invalid token, Please login again' });
    }

};


module.exports = authMiddleware