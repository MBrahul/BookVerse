import { Router } from "express";
import { get, updateAddress } from "./user.controllers.js";
import { fetchUser } from "../../middlewares/fetchuser.js";

export const router = Router();

// to get user info
router.get('/', fetchUser, get);

router.patch('/address', fetchUser,updateAddress);
