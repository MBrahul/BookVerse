import bcrypt from "bcryptjs";

/**
 * Hash password
 */
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

/**
 * compare password
 */
export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error("Error comparing password");
    }
};