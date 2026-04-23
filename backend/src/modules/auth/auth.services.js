import User from "../../../models/user.js";
import { signToken } from "../../config/jwt.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";

const userGetInfo = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    return user;
}

export const userSignUp = async ({ username, email, password, address }) => {

    // check if user already exits with same email
    let user = await User.findOne({ email: email });
    if (user) {
        const error = new Error('Email already registered');
        error.status = 400;
        throw error;
    }

    // check if username already taken

    user = await User.findOne({ username: username });
    if (user) {
        const error = new Error('Username already taken');
        error.status = 400;
        throw error;
    }


    // create new user

    const securedPassword = await hashPassword(password);

    user = await User.create({
        username, email, password: securedPassword, address
    });

    const token = signToken({
        user: {
            id: user._id,
            role: user.role
        }
    })
    return {
        token,
        data: user
    }
}

export const userSignIn = async ({ username, password }) => {

    // check if user exists or not
    let user = await User.findOne({ username });

    if (!user) {
        const error = new Error("Invaild credentials");
        error.status = 404;
        throw error;
    }

    const isMatch = await comparePassword(password, user.password);

    //comparing passwords
    if (!isMatch) {
        const error = new Error("Invaild credentials");
        error.status = 404;
        throw error;
    }

    //generate token
    const token = signToken({
        user: {
            id: user._id,
            role: user.role
        }
    });

    return {
        token,
        data: user
    }

}