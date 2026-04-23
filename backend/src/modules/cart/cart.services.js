import Book from "../../../models/book.js";
import User from "../../../models/user.js";

export const getCartService = async (id) => {
    const data = await User.findById(id).select('cart').populate('cart');
    return data.cart.reverse();
}

export const addToCartService = async (bookId, userId) => {

    //book should exists in database;
    const isBookExists = await Book.findById(bookId);

    if (!isBookExists) {
        const error = new Error("Book doesn't exist");
        error.status = 404;
        throw error;
    }

    const user = await User.findById(userId);
    const isBookInCart = user.cart.includes(bookId);

    if (isBookInCart) {
        const error = new Error("Book is alreday in cart");
        error.status = 409;
        throw error;
    }
    return await User.findByIdAndUpdate(userId, { $push: { cart: bookId } });
}

export const removeFromCartService = async (bookId, userId) => {
    const user = await User.findById(userId);
    const isBookInCart = user.cart.includes(bookId);
    if (isBookInCart) {
        return await User.findByIdAndUpdate(userId, { $pull: { cart: bookId } });
    }
    else {
        const error = new Error("Book is not in cart");
        error.status = 409;
        throw error;
    }
    return;
}