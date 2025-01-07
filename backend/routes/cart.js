const router = require('express').Router();
const Book = require('../models/book');
const fetchUser = require('../middlewares/fetchuser');
const User = require('../models/user')

//put book to cart
router.put('/add-to-cart', fetchUser, async (req, res) => {
    try {
        const { bookId } = req.body;
        const id = req.user.id;
        const user = await User.findById(id);
        const isBookInCart = user.cart.includes(bookId);
        if (isBookInCart) {
            return res.status(200).json({ status: true, msg: "Book is alreday in cart" });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
        return res.status(200).json({ status: true, msg: "Book added to cart" });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})


// remove book from cart
router.put('/remove-from-cart', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const { bookId } = req.body;
        const user = await User.findById(id);
        const isBookInCart = user.cart.includes(bookId);
        if (isBookInCart) {
            await User.findByIdAndUpdate(id, { $pull: { cart: bookId } });
        }
        return res.status(200).json({ status: true, msg: "Book removed from cart" });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})


router.get('/get-cart', fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        // const user = await User.findById(id);
        const data = await User.findById(id).select('cart').populate('cart');
        // console.log(data);
        res.json({
            status:true,
            data:data.cart.reverse()
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})
module.exports = router;