const router = require('express').Router();
const Book = require('../models/book');
const fetchUser = require('../middlewares/fetchuser');
const User = require('../models/user')
// const {body,validationResult} = require("express-validator");   

// add book to favourite
router.put('/add-book-to-favourite', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const { bookId } = req.body;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookId);
        if (isBookFavourite) {
            return res.status(200).json({ status: true, msg: "Book is already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
        return res.status(200).json({ status: true, msg: "Book added to favourites" });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})



// remove book in favourite
router.put('/remove-book-from-favourites', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const { bookId } = req.body;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookId);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
        }
        return res.status(200).json({ status: true, message: "Book removed from favourites" });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})

router.get('/get-favourite-books', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        // const user = await User.findById(id);
        const data = await User.findById(id).select('favourites').populate('favourites');
        res.json({
            status:true,
            data:data.favourites.reverse()
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})

module.exports = router;