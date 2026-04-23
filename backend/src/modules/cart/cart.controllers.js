import { addToCartService, getCartService, removeFromCartService } from "./cart.services.js";

export const getCart = async (req, res, next) => {
    try {
        const { user } = req;

        const cart = await getCartService(user?.id);

        return res.status(200).json({
            status: true,
            data: cart
        });
    } catch (error) {
        next(error);
    }
}

export const addToCart = async (req, res, next) => {
    try {

        const { bookId } = req.body;
        const { user } = req;

        if (!bookId) {
            const error = new Error('Book ID Missing');
            error.status = 404;
            throw error;
        }
        const result = await addToCartService(bookId, user.id);
        return res.status(200).json({ status: true, msg: "Book added to cart" });

    } catch (error) {
        next(error);
    }
}


export const removeFromCart = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const { user } = req;

        const result = await removeFromCartService(bookId, user.id);

        return res.status(200).json({ status: true, msg: "Book removed from cart" });

    } catch (error) {
        next(error);
    }
}


