import { Router } from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { getAllOrders, getHistory, placeOrder, updateOrderStatus } from "./order.controllers.js";

export const router = Router();

router.get('/',verifyRole('admin'),getAllOrders);
router.post('/place',verifyRole('user'),placeOrder);
router.get('/history',verifyRole('user'),getHistory);
router.patch('/update-status/:id',verifyRole('admin'),updateOrderStatus);