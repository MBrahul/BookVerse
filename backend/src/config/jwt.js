import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

/**
 * generate JWT token
 */
export const signToken = (payload) => {
    try {
        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRES_IN,
        });
    } catch (error) {
        throw new Error("Error generating JWT token: " + error.message);
    }
};

/**
 * verrify JWT token
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};