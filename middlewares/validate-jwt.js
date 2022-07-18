const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: 'Token not found in request'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token : User not found'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validateJWT
}