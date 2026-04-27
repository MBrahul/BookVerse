import { validationResult } from "express-validator";
import { createBookServie, deleteBookService, getAllBooksService, getBookByIdService, getRecentBooksServie, getSearchedBooksServie, updateBookService } from "./book.services.js";
import { validateSearchText } from "./book.validations.js";

export const createBook = async (req, res, next) => {
    try {

        const data = validationResult(req);
        if (data?.errors?.length != 0) {
            const error = new Error(data.errors[0].msg);
            error.status = 422;
            throw error;
        }

        const result = createBookServie(req.body);

        return res.status(200).json({
            status: true,
            msg: "Book added successfully"
        });

    } catch (error) {
        next(error);
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const data = validationResult(req);
        if (data?.errors?.length != 0) {
            const error = new Error(data.errors[0].msg);
            error.status = 422;
            throw error;
        }

        const { id } = req.params;
        const result = await updateBookService(id, req.body);

        res.status(200).json({
            status: true,
            msg: "Book updated successfully"
        });

    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteBookService(id);
        res.status(200).json({
            status: true,
            msg: "Book deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await getBookByIdService(id);
        if (!book) {
            const error = new Error("Book Not Found");
            error.status = 404;
            throw error;
        }
        return res.status(200).json({
            status: true,
            data: book
        })
    } catch (error) {
        next(error);
    }
}

export const getAllBooks = async (req, res, next) => {
    try {
        let { cursor, limit } = req.query;
        const query = {};
        if (cursor) {
            query._id = { $lt: cursor };
        }

        limit = Math.min(Number(limit) || 20, 20);

        const result = await getAllBooksService(query, limit);

        return res.status(200).json({
            status: true,
            data: result.books,
            nextCursor: result.nextCursor
        });

    } catch (error) {
        next(error);
    }
}
export const getRecentBooks = async (req, res, next) => {
    try {
        const books = await getRecentBooksServie();
        return res.status(200).json({
            status: true,
            data: books
        })
    } catch (error) {
        next(error);
    }
}

export const getSearchedBooks = async (req, res, next) => {
    try {

        let { limit, cursor ,text:searchText} = req.query;
        // console.log(limit,cursor,searchText);
        validateSearchText(searchText);

        limit = Math.min(Number(limit) || 10, 10);

        const query = {
            $text: { $search: searchText }
        };

        if (cursor) {
            query._id = { $lt: cursor };
        }

        const result = await getSearchedBooksServie(query, limit);

        return res.status(200).json({
            status: true,
            data: result.books,
            nextCursor: result.nextCursor
        });

    } catch (error) {
        next(error);
    }
}