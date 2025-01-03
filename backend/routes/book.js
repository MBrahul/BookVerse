const router = require('express').Router();
const Book = require('../models/book');
const fetchUser = require('../middlewares/fetchuser');
const {body,validationResult} = require("express-validator");   


//add book - admin

router.post('/add-book',fetchUser,[body('title', 'Title must be 3 letters').isLength({ min: 3 }),body('desc', 'Description must be 10 letters').isLength({ min: 3 })],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        status: false,
        msg: errors.array()
        });
    }

    try {
        const user = await req.user;

        // console.log(req.user)

        if(!user || user.role === "user"){
            return res.status(400).json({
                status:false,
                msg:"Permission required"
            })
        }
        const {title,url,author,price,language,desc} = req.body;
        await Book.create({
            title,url,author,desc,price,language
        });
        res.status(200).json({
            status:true
        });
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})


//update - book 
router.put('/update-book/:id',fetchUser,[body('title', 'Title must be 3 letters').isLength({ min: 3 }),body('desc', 'Description must be 10 letters').isLength({ min: 3 })],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        status: false,
        msg: errors.array()
        });
    }

    try {
        const user = await req.user;

        // console.log(req.user)

        if(!user || user.role === "user"){
            return res.status(400).json({
                status:false,
                msg:"Permission required"
            })
        }
        const {title,url,author,price,language,desc} = req.body;
        const {id} = req.params;
        await Book.findByIdAndUpdate(id,{
            title,url,author,desc,price,language
        });
        res.status(200).json({
            status:true
        });
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})


//delete-book

router.delete('/delete-book/:id',fetchUser,async(req,res)=>{

    try {
        const user = await req.user;

        // console.log(req.user)

        if(!user || user.role === "user"){
            return res.status(400).json({
                status:false,
                msg:"Permission required"
            })
        }
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({
            status:true
        });
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})


//***  public apis */


//get all books

router.get('/get-all-books',async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1})
        return res.json({
            status:true,
            data:books
        })
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})



// get-recently-added-books
router.get('/get-recent-books',async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(4)
        return res.json({
            status:true,
            data:books
        })
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})



//get-book-by-id

router.get('/get-book/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.json({
                status:false,
                msg:"Book not found"
            })
        }
        else{
            res.json({
                status:true,
                data : book
            })
        }
        
    } catch (error) {
        res.status(500).json({
            msg:"Internal server error"
        })
    }
})

module.exports = router;