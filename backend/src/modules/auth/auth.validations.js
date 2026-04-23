import { body } from "express-validator";

export const signUpValidator = () => {
    return [body('username', 'Username must be 3 letters').isLength({ min: 3 }), body('email', 'Enter valid email').isEmail(), body('password', 'password must be atleast 5 letters').isLength({ min: 5 }), body('address', 'address must be atleast 5 letters').isLength({ min: 5 })
    ];
}

export const signInValidator = () => {
    return [body('username', 'Username must be 3 letters').isLength({ min: 3 }), body('password', 'password must be atleast 5 letters').isLength({ min: 5 })
    ];
}