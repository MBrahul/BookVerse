import { getAllOrdersService, getHistoryService, placeOrderService, updateOrderStatusService } from "./order.services.js";
import { validateOrders, validateStatus } from "./order.validations.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const data = await getAllOrdersService();
        return res.status(200).json({
            status: true,
            data: data
        })
    } catch (error) {
        next(error);
    }
}


export const placeOrder = async (req, res, next) => {
    try {
        const { user } = req;
        const { orders } = req.body;
        
        validateOrders(orders);

        const result = await placeOrderService(orders,user.id);
        return res.status(200).json({
            status: true,
            msg: "Orders placed successfully"
        })

    } catch (error) {
        next(error);
    }
}

export const getHistory = async (req, res, next) => {
    try {
        const { user } = req;
        const data = await getHistoryService(user);
        res.status(200).json({
            status: true,
            data: data
        })
    } catch (error) {
        next(error);
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        validateStatus(status);

        const result = await updateOrderStatusService(id, status);
        return res.status(200).json({
            status: true,
        })
    } catch (error) {
        next(error);
    }
}