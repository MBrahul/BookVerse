import Book from "../../../models/book.js";
import User from "../../../models/user.js";

export const addBookToFavouritesService = async (bookId, userId) => {
    // console.log(bookId,userId);
    const user = await User.findById(userId);
    //book should exists in database;
    const isBookExists = await Book.findById(bookId);

    if (!isBookExists) {
        const error = new Error("Book doesn't exist");
        error.status = 404;
        throw error;
    }

    const isBookFavourite = user.favourites.includes(bookId);
    if (isBookFavourite) {
        const error = new Error("Book is already in favourites");
        error.status = 404;
        throw error;
    }
    await User.findByIdAndUpdate(userId, { $push: { favourites: bookId } });
    return;
}

export const removeBookFromFavouriteService = async (bookId, userId) => {
    const user = await User.findById(userId);
    const isBookFavourite = user.favourites.includes(bookId);
    if (isBookFavourite) {
        await User.findByIdAndUpdate(userId, { $pull: { favourites: bookId } });
    }
    return;
}

export const getFavouriteBooksService = async (userId) => {
    const data = await User.findById(userId).select('favourites').populate('favourites');
    return data.favourites.reverse();
}