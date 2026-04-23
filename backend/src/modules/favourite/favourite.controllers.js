import { addBookToFavouritesService, getFavouriteBooksService, removeBookFromFavouriteService } from "./favourite.services.js";
import { validateBookId } from "./favourite.validations.js";

export const addBookToFavourites = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        validateBookId(bookId);
        const { user } = req;
        const result = await addBookToFavouritesService(bookId, user.id);
        return res.status(200).json({ status: true, msg: "Book added to favourites" });
    } catch (error) {
        next(error);
    }
}

export const removeBookFromFavourite = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        validateBookId(bookId);
        const { user } = req;
        const result = await removeBookFromFavouriteService(bookId, user.id);
        return res.status(200).json({ status: true, message: "Book removed from favourites" });
    } catch (error) {
        next(error);
    }
}

export const getFavouriteBooks = async (req, res, next) => {
    try {
        const { user } = req;

        const result = await getFavouriteBooksService(user.id);
        res.status(200).json({
            status: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}