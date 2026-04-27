import { Router } from "express";
import { fetchUser } from "../../middlewares/fetchuser.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { validateBookDetail } from "./book.validations.js";
import { createBook, deleteBook, getAllBooks, getBookById, getRecentBooks, updateBook ,getSearchedBooks} from "./book.controllers.js";


export const router = Router();

//get all books
router.get('/',getAllBooks);

//add book
router.post('/', fetchUser, verifyRole('admin'), validateBookDetail(), createBook);

//get-recent books
router.get('/recent',getRecentBooks);

router.get('/search',getSearchedBooks);


//get book
router.get('/:id',getBookById);

//update book
router.put('/:id',fetchUser, verifyRole('admin'), validateBookDetail(),updateBook);

//delete book
router.delete('/:id',fetchUser, verifyRole('admin'),deleteBook);


