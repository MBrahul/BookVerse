import { Router } from "express";
import { signIn, signUp } from "./auth.controllers.js";
import { signInValidator, signUpValidator } from "./auth.validations.js";

export const router = Router();

router.post('/sign-up', signUpValidator(), signUp);
router.post('/sign-in', signInValidator(), signIn);


