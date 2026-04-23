import { validationResult } from 'express-validator';
import { userSignIn, userSignUp } from './auth.services.js';

export const signUp = async (req, res, next) => {

    try {
        let data = validationResult(req);

        if (data?.errors?.length != 0) {
            const error = new Error(data.errors[0].msg);
            error.status = 422;
            return next(error);
        }


        data = await userSignUp(req.body);

        // console.log(data);
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        })

        res.status(200).json({ ...data, status: true });

    } catch (error) {
        next(error);
    }

}

export const signIn = async (req, res, next) => {
    try {
        let data = validationResult(req);

        if (data?.errors?.length != 0) {
            const error = new Error(data.errors[0].msg);
            error.status = 422;
            return next(error);
        }

        data = await userSignIn(req.body);

        // console.log(data);
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        })

        // res.cookie('token',data.token);
        return res.status(200).json({ status: true, ...data });

    } catch (error) {
        next(error);
    }
}
