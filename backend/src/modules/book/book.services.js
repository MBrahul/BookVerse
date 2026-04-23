import Book from "../../../models/book.js";

export const getAllBooksService = async () => {
    const books = await Book.find().sort({ createdAt: -1 })
    return books;
}

export const getRecentBooksServie = async () => {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    return books;
}

export const getBookByIdService = async (id) => {
    const book = await Book.findById(id);
    return book;
}

export const createBookServie = async ({ title, url, author, price, language, desc }) => {
    const book = await Book.create({
        title, url, author, desc, price, language
    });
    return book;
}

export const updateBookService = async (id, data) => {
    const { title, url, author, price, language, desc } = data;
    const book = await Book.findByIdAndUpdate(id, {
        title, url, author, desc, price, language
    });
    return book;
}

export const deleteBookService = async(id)=>{
    const data =  await Book.findByIdAndDelete(id);
    return data;
}