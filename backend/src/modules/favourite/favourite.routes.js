import { Router } from "express";
import { addBookToFavourites, getFavouriteBooks, removeBookFromFavourite } from "./favourite.controllers.js";

export const router = Router();

router.get('/book',getFavouriteBooks);
router.post('/book',addBookToFavourites);
router.delete('/book',removeBookFromFavourite);
