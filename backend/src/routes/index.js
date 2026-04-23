import express from 'express';

import { router as authRouter } from "../modules/auth/auth.routes.js";
import {router as userRouter} from "../modules/user/user.routes.js"
import {router as bookRouter} from "../modules/book/book.routes.js"
import {router as cartRouter} from "../modules/cart/cart.routes.js"
import {router as orderRouter} from "../modules/order/order.routes.js"
import {router as favouriteRoute} from "../modules/favourite/favourite.routes.js";

import { fetchUser } from "../middlewares/fetchuser.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user',userRouter);
router.use('/book',bookRouter);
router.use('/cart',fetchUser,verifyRole('user'),cartRouter);
router.use('/order',fetchUser,orderRouter);
router.use('/favourite',fetchUser,verifyRole('user'),favouriteRoute);

export default router;