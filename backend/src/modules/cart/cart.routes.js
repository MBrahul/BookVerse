import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controllers.js";
import { fetchUser } from "../../middlewares/fetchuser.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

export const router = Router();

router.get('/',getCart);
router.post('/',addToCart);
router.patch('/:bookId',removeFromCart);

