import jwt from 'jsonwebtoken';
import { verifyToken } from '../config/jwt.js';

export const fetchUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log("All cookies:", req.cookies); 
        // console.log("Token : ", token);
        if (!token) {
            return res.status(400).json({
                status: false,
                msg: "Authenticate with correct credentails"
            })
        }
        // console.log(token)
        const data = verifyToken(token);
        req.user = data.user;

        return next();

    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        })
    }
}
