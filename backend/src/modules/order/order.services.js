import Order from "../../../models/order.js";
import User from "../../../models/user.js";

export const getAllOrdersService = async () => {
    const data = await Order.find().populate(["book", { path: "user", select: ["_id", "username", "email", "address"] }]).sort({ createdAt: -1 });
    return data;
}

export const placeOrderService = async (orders,userId) => {
    for (const order of orders) {
        // console.log(order._id)
        const newOrder = new Order({ user: userId, book: order._id });
        const data = await newOrder.save();
        //add to user's orders
        await User.findByIdAndUpdate(userId, { $push: { orders: data._id } });
        // remove from user's cart
        await User.findByIdAndUpdate(userId, { $pull: { cart: order._id } });
    }
    return;
}

export const getHistoryService = async (user) => {
    const data = await User.findById(user.id).select(['orders', '-_id']).populate({ path: 'orders', populate: 'book' });
    return data.orders.reverse();
}

export const updateOrderStatusService = async (orderId, status) => {
    const data = await Order.findByIdAndUpdate(orderId, { status: status });
    return;
}